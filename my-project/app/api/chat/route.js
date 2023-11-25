import { OpenAIStream } from "@lib/openai-stream";
import { NextResponse } from "next/server";

export async function POST(req){
    const body  =  await req.json();
    
    const stream = await OpenAIStream({outputData: body.data, query: body.query, prevMessages: body.messages})
    return NextResponse.json({message:stream})
} ;