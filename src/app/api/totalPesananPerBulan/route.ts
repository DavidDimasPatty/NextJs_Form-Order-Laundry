import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("Laundry");

        const tahunSekarang = new Date().getFullYear();

        // Aggregation untuk menghitung jumlah pesanan per bulan
        const result = await db.collection("order").aggregate([
            {
                $addFields: {
                    addtime: { $toDate: "$addtime" } // Ubah string ke Date
                }
            },
            {
                $match: {
                    addtime: {
                        $gte: new Date(`${tahunSekarang}-01-01`), // Dari 1 Januari tahun ini
                        $lt: new Date(`${tahunSekarang + 1}-01-01`) // Sampai 1 Januari tahun depan
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$addtime" }, // Kelompokkan berdasarkan bulan
                    totalPesanan: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Urutkan berdasarkan bulan
        ]).toArray();

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}