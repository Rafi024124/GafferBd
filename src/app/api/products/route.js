import dbConnect, { collectionNamesObj } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";



export async function GET(req){
    try {
        const collection = await dbConnect(collectionNamesObj.productsCollection);
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get("limit")) || 0;

        const products = limit > 0
        ? await collection.find({}).limit(limit).toArray()
        : await collection.find({}).toArray();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}

export async function POST(req){
    try {
        const collection = await dbConnect(collectionNamesObj.productsCollection);
        const data = await req.json();

        if(!data.title || !data.price || !data.sizes){
            return NextResponse.json({ error: "Missing required fields"}, { status: 400 })

        }

    const result = await collection.insertOne(data);

    return NextResponse.json({ message: "Product added successfully", productId: result.insertedId})

    } catch (error) {
         return NextResponse.json({ error: error.message }, { status: 500 });
    }
}