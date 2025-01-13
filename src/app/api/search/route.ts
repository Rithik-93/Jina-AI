import { NextRequest, NextResponse } from "next/server";
import { indexHost, pc } from "../actions/action";
import { generateEmbedding } from "../actions/ai";
import prisma from "../../../../prisma/src";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { query, clientId } = data;
    const namespace = clientId.toString();
    const embed = await generateEmbedding(query);

    const vectorIds = await searchVectorDB(embed, namespace);
    const products = await searchDB(vectorIds)
    return NextResponse.json({ products })
}

async function searchVectorDB(queryVector: any, namespace: string) {
    try {
        const index = pc.index(namespace, indexHost);
        const queryResponse = await index.namespace(namespace).query({
            vector: queryVector,
            topK: 10,
            includeMetadata: true,
        });
        const vectorIds = queryResponse.matches.map(x => { return x.id })
        return vectorIds;
    } catch (error) {
        console.error('Error querying Pinecone:', error);
        throw new Error(`Pinecone query failed: ${error}`);
    }
}

async function searchDB(vectorIds: string[]) {
    const products = await prisma.item.findMany({
        where: {
            vectorId: {
                in: vectorIds
            }
        }
    })
    return products
}