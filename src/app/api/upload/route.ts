import { NextRequest, NextResponse } from "next/server";
import { index } from "../actions/action";
import { randomUUID } from "crypto";
import { generateEmbedding } from "../actions/ai";
import prisma from "../../../../prisma/src";

export interface Product {
    id: string,
    title: string,
    category: string,
    tags: string[],
    price: number,
    brand: string,
    description: string,
    image_url: string
}

// type Products = Product[]

export async function POST(req: NextRequest) {
    const data = await req.json();

    try {
        const { products, clientId } = data;

        if (!Array.isArray(products) || products.length === 0) {
            return NextResponse.json(
                { message: 'Invalid product data' }, 
                { status: 400 }
            );
        }

        if (!clientId) {
            return NextResponse.json(
                { message: 'Client ID is required' }, 
                { status: 400 }
            );
        }

        const namespace = clientId.toString();
        const batchSize = 50;
        const results = [];
        const errors = [];

        for (let i = 0; i < products.length; i += batchSize) {
            const batch = products.slice(i, i + batchSize);
            
            const batchResults = await Promise.allSettled(
                batch.map(async (product: Product) => {
                    const { id, title, description } = product;

                    if (!title || !description) {
                        throw new Error(`Missing product information for product ID: ${id || 'unknown'}`);
                    }

                    const dataToEmbed = `${title} ${description}`;
                    const embedding = await generateEmbedding(dataToEmbed);
                    const vectorId = randomUUID();

                    return {
                        id: vectorId,
                        values: embedding,
                        metadata: { ...product },
                        original: product
                    };
                })
            );

            const successfulResults = batchResults
                .filter((result): result is PromiseFulfilledResult<any> => 
                    result.status === 'fulfilled'
                )
                .map(result => result.value);

            const failedResults = batchResults
                .filter((result): result is PromiseRejectedResult => 
                    result.status === 'rejected'
                )
                .map(result => ({
                    error: result.reason.message,
                    product: batch[batchResults.indexOf(result)]
                }));

            results.push(...successfulResults);
            errors.push(...failedResults);

            if (successfulResults.length > 0) {
                const vectors = successfulResults.map(result => ({
                    id: result.id,
                    values: result.values,
                    metadata: result.metadata
                }));

                const dbRecords = successfulResults.map(result => ({
                    vectorId: result.id,
                    name: result.metadata.title,
                    clientId: String(namespace),
                    metadata: result.metadata,
                }));

                await prisma.$transaction(async (tx) => {
                    await index.namespace(namespace).upsert(vectors);
                    await tx.item.createMany({
                        data: dbRecords,
                        skipDuplicates: true
                    });
                });
            }
        }

        return NextResponse.json({
            message: 'Products processing completed',
            totalProcessed: products.length,
            successful: results.length,
            failed: errors.length,
            errors: errors.length > 0 ? errors : undefined,
        });

    } catch (error) {
        console.error('Error uploading products:', error);
        return NextResponse.json(
            { 
                message: 'Internal Server Error', 
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
