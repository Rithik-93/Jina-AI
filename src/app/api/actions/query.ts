import { randomUUID } from "crypto";
import { index } from "./action";
import { Product } from "../upload/route";

export async function uploadToDb(product: Product, embedding: number[], namespace: string) {
    const record = {
        id: randomUUID(),
        values: embedding,
        metadata: {
            title: product.title,
            category: product.category,
            tags: product.tags,
            price: product.price,
            brand: product.brand,
            description: product.description,
            image_url: product.image_url
        }
    };

    try {
        await index.namespace(namespace).upsert([record]);
        console.log('Record upserted successfully!');
    } catch (error) {
        console.error('Error upserting to Pinecone:', error);
        throw error;
    }
}