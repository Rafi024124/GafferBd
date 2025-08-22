import dbConnect, { collectionNamesObj } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        const {id} = params;
        if(!ObjectId.isValid(id)){
            return NextResponse.json({ error: "Invalid product ID"}, {status: 400});
        
        }
        const collection = await dbConnect(collectionNamesObj.productsCollection)
        const product = await collection.findOne({ _id: new ObjectId(id)});

        if(!product){
            return NextResponse.json({error: "Product not found"}, {status: 404});

        }
        return NextResponse.json(product);
    } catch (error) {
       return NextResponse.json({ error: error.message }, { status: 500 });
    }
}