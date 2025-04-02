import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("Laundry");

        const result = await db.collection("order").aggregate([
            {
                $group: {
                    _id: "$jenis",
                    totalJenis: {
                        $sum: 1
                    }
                }
            }
        ]).toArray();

        return NextResponse.json(result, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}