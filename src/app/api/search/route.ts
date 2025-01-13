import { NextRequest, NextResponse } from "next/server";
import { indexHost, pc } from "../actions/action";
import { generateEmbedding } from "../actions/ai";
// import { Pinecone } from '@pinecone-database/pinecone';

// export const pc = new Pinecone({
//   apiKey: process.env.PINECONE_API!,
// });


export async function POST(req: NextRequest) {
    const data = await req.json();
    const { query, clientId } = data;
    const namespace = clientId.toString();
    const embed = await generateEmbedding(query);
    
    const dat = await searchDB(embed, namespace);
    return NextResponse.json({ dat })
}
async function searchDB(queryVector: any, namespace: string) {
    try {
        const index = pc.index(namespace, indexHost);
        const queryResponse = await index.namespace(namespace).query({
            vector: queryVector,
            topK: 4,
            includeMetadata: true,
        });
        return queryResponse.matches;
    } catch (error) {
        console.error('Error querying Pinecone:', error);
        throw new Error(`Pinecone query failed: ${error}`);
    }
}