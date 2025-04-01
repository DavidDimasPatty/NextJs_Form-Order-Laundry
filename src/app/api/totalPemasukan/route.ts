import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";


export async function GET() {
    try {
        var client = await clientPromise;
        var db = client.db("Laundry");

        const result = await db.collection("order").aggregate([
            { $group: { _id: null, totalPenghasilan: { $sum: "$harga" } } }
        ]).toArray();

        const totalPenghasilan = result.length > 0 ? result[0].totalPenghasilan : 0;
        return NextResponse.json({ totalPenghasilan }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ "error": "Internal Server Error" }, { "status": 500 })
    }
}