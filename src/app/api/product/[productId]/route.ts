import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/src";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { id, clientId } = data;
    const product = await prisma.item.findFirst({
        where: {
            id,
            clientId
        }
    });
    return NextResponse.json({ product })
}