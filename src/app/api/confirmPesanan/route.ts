import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("Laundry");

        const body = await req.json();
        const { id, status } = body;
        console.log(id);
        if (!id || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!(status == 1 || status == -1)) {
            return NextResponse.json({ error: "Status Field Error" }, { status: 400 });
        }

        const result = await db.collection("order").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: status } }
        );

        return NextResponse.json({ message: "Order saved", data: result }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}