import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import OpenAI from "openai";
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export const config = {
    runtime: "edge",

}
 export async function POST(req) {
    try{
        const { query } = (await req.json());
        console.log(query);
        // const response = await fetch("https://api.openai.com/v1/embeddings", {
        //     method : "POST",
        //     headers: {
        //         "Content-Type":" application/json",
        //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        //     },
        //     body: JSON.stringify({
        //             input: query,
        //             model: 'text-embeddings-ada-002',
        //     }),
        // });
        // const json = awiat response.json();
        // const embedding = json.data[0].embedding;
        const embedding = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: query,
          });
          
          const embeddings = embedding.data[0].embedding;
          
        //   console.log(embeddings);
        let outputData = ''
        try {            
            const result = await supabase.rpc('cbt_search',{
                query_embedding: embeddings,
                similarity_threshold: 0.78,
                match_count: 5
            })
            result.data.map(chunk => outputData+=chunk.chunks) 
            console.log("Output Data is: ",outputData)
        } catch (error) {
            console.log('This is Supabase error: ', error);
        }

        
        return new Response(JSON.stringify(outputData),{ status: 200 });
    }
    catch(e){
        console.log(e)
        return new Response(e, { status: 500})
    }
}