import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";


export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("Laundry");
        const result = await db.collection("order").countDocuments();

        return NextResponse.json({ "totalOrders": result }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}