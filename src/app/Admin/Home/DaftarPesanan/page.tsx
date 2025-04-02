"use client"
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const DaftarPesanan = () => {

    interface Customer {
        _id: string;
        nama: string;
        alamat: string;
        noHP: string;
        email: string;
        jenis: string;
        banyak: number;
        berat: number;
        harga: number;
        addtime: string;
        addid: string;
        status: number;
    }
    const [dataOrder, setDataOrder] = useState<Customer[]>([]);

    useEffect(() => {

        const totalPemasukanData = async () => {
            const response = await fetch("/api/daftarPesanan");
            const result = await response.json();
            setDataOrder(result || [])
        };

        Promise.all([
            totalPemasukanData(),
        ]);
    }, []);

    const columns = [
        { name: "No", selector: (row: Record<string, any>) => row.index, sortable: true },
        { name: "Nama Pemesan", selector: (row: Customer) => row.nama, sortable: true },
        { name: "Alamat Pesanan", selector: (row: Customer) => row.alamat },
        { name: "No HP", selector: (row: Customer) => row.noHP },
        { name: "Jenis", selector: (row: Customer) => row.jenis },
        { name: "Kuantitas", selector: (row: Customer) => (row.jenis === "pakaian" ? row.berat : row.banyak) },
        { name: "Waktu Pesanan", selector: (row: Customer) => row.addtime },
        { name: "Status", selector: (row: Customer) => (row.status === 0 ? "Proses" : "Lainya"), sortable: true },
        {
            name: "Action",
            cell: (row: Customer) => (
                <>
                    <button className="btn btn-success me-2">Selesai</button>
                    <button className="btn btn-danger">Tolak</button>
                </>
            )
        }
    ];

    return (
        <div className="d-flex justify-content-center align-items-start vh-100 mt-5 pt-3">
            <div className="col-md-11">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3>Daftar Pesanan</h3>
                    </div>
                    <div className="card-body">
                        <DataTable
                            columns={columns}
                            data={dataOrder.map((item, index) => ({ ...item, index: index + 1 }))} // Tambahkan index
                            pagination // Tambahkan fitur pagination
                            highlightOnHover
                            responsive
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DaftarPesanan;