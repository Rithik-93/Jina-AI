import { randomUUID } from "crypto";
import { index } from "./action";
import { Product } from "../upload/route";
import prisma from "../../../../prisma/src";

export async function uploadToDb(product: Product, embedding: number[], namespace: string) {
    const record = {
        id: randomUUID(),
        values: embedding,
        metadata: product as Record<string, any>
    };

    try {
        await index.namespace(namespace).upsert([record]);
        console.log('Record upserted successfully!');
    } catch (error) {
        console.error('Error upserting to Pinecone:', error);
        throw error;
    }
}

export async function queryItems(clientId: number) {
    try {
        const items = await prisma.item.findMany({
            where: {
                clientId: clientId.toString()
            }
        })
        return items;
    } catch (error) {
        console.error('Error querying Pinecone:', error);
        throw new Error(`Pinecone query failed: ${error}`);
    }
}

export async function uploadDb(product: Product[], clientId: number) {
    const items = await prisma.item.createMany({
        data: product.map(x =>
        ({
            clientId: clientId.toString(),
            metadata: JSON.parse(JSON.stringify(x)),
            name: x.title,
            status: "active"
        })
        )
    })

    return items
}