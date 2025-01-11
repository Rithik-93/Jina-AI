import { NextRequest, NextResponse } from "next/server";
import { index } from "../actions/action";
import { randomUUID } from "crypto";
import { generateEmbedding } from "../actions/ai";
import { uploadToDb } from "../actions/query";

export const testNameSpace = "jina";

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

type Products = Product[]

export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        const { products } = data;

        if (!Array.isArray(products) || products.length === 0) {
            return NextResponse.json({ message: 'Invalid product data' });
        }

        const vectors = await Promise.all(products.map(async (product: Product) => {
            const { id, title, category, tags, price, brand, description, image_url } = product;

            if (!id || !title || !category || !tags || !price || !brand || !description || !image_url) {
                throw new Error('Missing product information');
            }

            const dataToEmbed = title.concat(description);
            const embedding = await generateEmbedding(dataToEmbed);
            await uploadToDb(product, embedding, testNameSpace);

            return data
        }));

        return NextResponse.json({ vectors });
    } catch (error) {
        console.error('Error uploading products:', error);
        return NextResponse.json({ message: 'Internal Server Error' });
    }
}
