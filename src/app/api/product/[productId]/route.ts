import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/src";

export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;
    const clientId = "3"
    const product = await prisma.item.findFirst({
        where: {
            id,
            clientId
        }
    });
    return NextResponse.json({ product })
}