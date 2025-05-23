import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("Laundry");

        const body = await req.json();
        const { nama, alamat, noHP, email, jenis, banyak, berat, harga } = body;

        if (!nama || !alamat || !noHP || !jenis || !harga) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (jenis === "pakaian" && !berat) {
            return NextResponse.json({ error: "Berat is required for pakaian" }, { status: 400 });
        }

        if (jenis !== "pakaian" && !banyak) {
            return NextResponse.json({ error: "Banyak is required for non-pakaian" }, { status: 400 });
        }

        const datetime = new Date().toISOString(); // Waktu dalam format ISO
        const ipaddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "Unknown"; // Ambil IP dari request

        const result = await db.collection("order").insertOne({
            nama, alamat, noHP, email, jenis, banyak, berat, harga, addtime: datetime,
            addid: "WebLaundry" + ipaddress, status: 0
        });

        return NextResponse.json({ message: "Order saved", data: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}