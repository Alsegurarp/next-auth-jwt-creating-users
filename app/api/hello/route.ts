import { NextResponse } from "next/server";
// NextResponse retorna un mensaje tipo json

export function GET() {
    return NextResponse.json({message: 'Hello world!'});
} 
