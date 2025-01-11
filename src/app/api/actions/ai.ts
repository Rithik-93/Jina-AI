import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI!)

export async function generateEmbedding(data: string) {
    const model = genAI.getGenerativeModel({
        model: "text-embedding-004"
    })
    const res = await model.embedContent(data)
    const embedding = res.embedding;
    return embedding.values
}

