import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
    try {
        var client = await clientPromise;
        var db = client.db("Laundry")
        const result = await db.collection("order").aggregate([
            {
                $match: {
                    status: { $ne: 0 }
                }
            },
            {
                $sort: { addtime: 1 }
            }
        ]).toArray();
        return NextResponse.json(result);
    }
    catch (Error) {
        return NextResponse.json({ message: "Internal Server Error", status: "500" })
    }
}