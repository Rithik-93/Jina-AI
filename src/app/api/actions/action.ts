import { Pinecone } from '@pinecone-database/pinecone';

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API!,
});

export const indexName = "jina";
export const indexHost = process.env.HOST;

export const index = pc.index(indexName,)