import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
    try {
        var client = await clientPromise;
        var db = client.db("Laundry")
        const result = await db.collection("order").aggregate([
            {
                $group: {
                    _id: "$nama",
                    totalPesanan: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: { totalPesanan: -1 }
            },
            {
                $limit: 5
            }
        ]).toArray();
        return NextResponse.json(result);
    }
    catch (Error) {
        return NextResponse.json({ message: "Internal Server Error", status: "500" })
    }
}