import { NextRequest, NextResponse } from "next/server";
import { index } from "../actions/action";
import { generateEmbedding } from "../actions/ai";


export async function POST(req: NextRequest) {
    const data = await req.json();
    const { query } = data;
    const embed = await generateEmbedding(query);
    const dat = await searchDB(embed);
    console.log(dat);
    return NextResponse.json({ dat })
}
async function searchDB(queryVector: any) {
    try {
        const queryResponse = await index.namespace("jina").query({
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