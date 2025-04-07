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
    const [dataOrderTemp, setDataOrderTemp] = useState<Customer[]>([]);
    useEffect(() => {

        const totalPemasukanData = async () => {
            const response = await fetch("/api/historyDaftarPesanan");
            const result = await response.json();
            if (response.ok) {
                setDataOrder(result || [])
                setDataOrderTemp(result || []);
            }
        };

        Promise.all([
            totalPemasukanData(),
        ]);
    }, []);

    const cariPesanan = async (find: string) => {
        setDataOrderTemp(dataOrder);
        if (find != "") {
            const filtered = dataOrder.filter(x => x.nama.toLowerCase().includes(find.toLowerCase())
                || x.jenis.toLowerCase().includes(find.toLowerCase())
                || x.alamat.toLowerCase().includes(find.toLowerCase())
                || x.noHP.toLowerCase().includes(find.toLowerCase()));
            setDataOrderTemp(filtered);
        }

    }

    const columns = [
        { name: "No", selector: (row: Record<string, any>) => row.index, sortable: true },
        { name: "Nama Pemesan", selector: (row: Customer) => row.nama, sortable: true },
        { name: "Alamat Pesanan", selector: (row: Customer) => row.alamat, sortable: true },
        { name: "No HP", selector: (row: Customer) => row.noHP, sortable: true },
        { name: "Jenis", selector: (row: Customer) => row.jenis, sortable: true },
        { name: "Kuantitas", selector: (row: Customer) => (row.jenis === "pakaian" ? row.berat : row.banyak), sortable: true },
        { name: "Waktu Pesanan", selector: (row: Customer) => row.addtime, sortable: true },
        {
            name: "Status",
            sortable: true,
            sortFunction: (a: Customer, b: Customer) => a.status - b.status,
            cell: (row: Customer) => (
                <span className={
                    row.status === 0
                        ? "badge bg-warning text-dark"
                        : row.status === 1
                            ? "badge bg-success"
                            : "badge bg-danger"
                }>
                    {row.status === 0 ? "Proses" : row.status === 1 ? "Selesai" : "Ditolak"}
                </span>
            )
        }];

    return (
        <div className="col justify-content-center align-items-start mt-5">
            <div className="d-flex  justify-content-center align-items-start">
                <div className="card card-primary w-75">
                    <div className="card-header">
                        <h3>History Daftar Pesanan</h3>
                    </div>
                    <div className="card-body">
                        <input className="form-control" placeholder="Cari Pesanan..." onChange={(e) => cariPesanan(e.target.value)} />
                        <DataTable
                            columns={columns}
                            data={dataOrderTemp.map((item, index) => ({ ...item, index: index + 1 }))} // Tambahkan index
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