"use client"
import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";

// Registrasi komponen untuk Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend, Title);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,  // ✅ Registrasi elemen "point"
    LineElement,
    Title,
    Tooltip,
    Legend
);
const Home = () => {
    interface Customer {
        _id: string;
        totalPesanan: number;
    }

    interface status {
        _id: number;
        totalOrder: number;
    }

    interface OrderDataIncome {
        _id: number;
        totalPendapatan: number;
    }

    interface OrderData {
        _id: number;
        totalPesanan: number;
    }

    const [totalPesan, setTotalPesan] = useState(0);
    const [totalPemasukan, setTotalPemasukan] = useState(0);
    const [customerMost, setCustomerMost] = useState<Customer[]>([]);
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; backgroundColor: string }[];
    }>({
        labels: [],
        datasets: []
    });
    const [chartDataPie, setChartDataPie] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; backgroundColor: string[] }[];
    }>({
        labels: [],
        datasets: []
    });
    const [chartDataIncome, setChartDataIncome] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; backgroundColor: string; borderColor: string, fill: boolean }[];
    }>({
        labels: [],
        datasets: []
    });


    const [totalStatus, setTotalStatus] = useState<status[]>([]);
    const [pesananBerhasil, setPesananBerhasil] = useState(0);
    const [pesananGagal, setPesananGagal] = useState(0);
    const [pesananProses, setPesananProses] = useState(0);

    useEffect(() => {
        const totalPesananData = async () => {
            const response = await fetch("/api/totalPesanan");
            const result = await response.json();

            if (result.totalOrders !== undefined) {
                setTotalPesan(result.totalOrders);
            } else {
                setTotalPesan(0);
            }
        };

        const totalPemasukanData = async () => {
            const response = await fetch("/api/totalPemasukan");
            const result = await response.json();

            if (result.totalPenghasilan !== undefined) {
                setTotalPemasukan(result.totalPenghasilan);
            } else {
                setTotalPemasukan(0);
            }
        };


        const totalStatusPesan = async () => {
            const response = await fetch("/api/statusPesan");
            const result = await response.json();
            console.log(result);
            setTotalStatus(result);

            const matchedBerhasil = result.find((item: { _id: number }) =>
                [1].includes(item._id)
            );

            const matchedGagal = result.find((item: { _id: number }) =>
                [-1].includes(item._id)
            );

            const matchedWait = result.find((item: { _id: number }) =>
                [0].includes(item._id)
            );
            console.log(matchedGagal);
            if (matchedBerhasil != null) {
                setPesananBerhasil(matchedBerhasil.totalOrder)
            }
            if (matchedWait != null) {
                setPesananProses(matchedWait.totalOrder)

            }
            if (matchedGagal != null) {
                setPesananGagal(matchedGagal.totalOrder)
            }
        };

        const customerMostOrder = async () => {
            const response = await fetch("/api/customerMost");

            const result: Customer[] = await response.json();
            setCustomerMost(result || []);
        }

        const fetchOrdersPerMonth = async () => {
            const response = await fetch("/api/totalPesananPerBulan");
            const result: OrderData[] = await response.json();
            const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
            let dataChart = Array(12).fill(0);
            result.forEach(item => {
                dataChart[item._id - 1] = item.totalPesanan;
            });
            setChartData({
                labels: bulan,
                datasets: [
                    {
                        label: "Total Pesanan",
                        data: dataChart,
                        backgroundColor: "rgba(54, 162, 235, 0.6)"
                    }
                ]
            });
        };

        const fetchIncomePerMonth = async () => {
            const response = await fetch("/api/pendapatanPerBulan");
            const result: OrderDataIncome[] = await response.json();
            const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
            let dataChart = Array(12).fill(0);
            result.forEach(item => {
                dataChart[item._id - 1] = item.totalPendapatan;
            });
            setChartDataIncome({
                labels: bulan,
                datasets: [
                    {
                        label: "Total Pendapatan",
                        data: dataChart,
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                        borderColor: "blue",
                        fill: true
                    }
                ]
            });
        };

        const jenisPakaianTerbanyak = async () => {
            const response = await fetch("/api/jenisPakaian"); // Pastikan URL sesuai dengan API Anda
            interface OrderDataPie {
                _id: string;
                totalJenis: number;
            }
            const result: OrderDataPie[] = await response.json();
            console.log(result);

            const labelsPie: string[] = [];
            const dataPie: number[] = [];
            const backgroundColorPie: string[] = [];


            // Map data yang diterima untuk chart
            result.forEach(item => {
                labelsPie.push(item._id); // Menambahkan 'jenis' sebagai label
                dataPie.push(item.totalJenis); // Menambahkan total jenis sebagai data
                backgroundColorPie.push(getRandomColor()); // Menambahkan warna acak untuk pie slice
            });

            // Mengupdate chart data
            setChartDataPie({
                labels: labelsPie,
                datasets: [{
                    label: "Total Jenis Pakaian", // Bisa menambahkan label sesuai kebutuhan
                    data: dataPie,
                    backgroundColor: backgroundColorPie,
                }],
            });
        };

        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };


        Promise.all([
            totalPesananData(),
            totalPemasukanData(),
            customerMostOrder(),
            fetchOrdersPerMonth(),
            jenisPakaianTerbanyak(),
            totalStatusPesan(),
            fetchIncomePerMonth()
        ]);

    }, []);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="row vw-100 h-auto">
                
                 {/* Data-data Perjumlahan */}
                <div className="col-md-3 d-flex justify-content-center align-items-center">

                    <div className="row-md-5 w-75 p-6">
                        <div className="col mb-4">
                            <div className="card card-primary">
                                <div className="card-header text-center">
                                    <b>Total Pesanan</b>
                                </div>
                                <div className="card-body text-center">
                                    <h4>{totalPesan}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-header text-center">
                                    <b>Total Pemasukan</b>
                                </div>
                                <div className="card-body text-center">
                                    <h4>Rp. {totalPemasukan.toLocaleString("id-ID")}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* **** */}

                {/* Grafik Pesanan Per Bulan*/}
                <div className="col-md-5 d-flex justify-content-center align-items-center">

                    <div className="col mt-4">
                        <div className="card card-primary">
                            <div className="card-header text-center">
                                <b>Grafik Pesanan per Bulan</b>
                            </div>
                            <div className="card-body text-center">
                                <Bar data={chartData} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* **** */}


                {/* Table Pelanggan Laundry Terbanyak */}
                <div className="col-md-4 d-flex justify-content-beetwen align-items-center">

                    <div className="col">
                        <div className="card card-primary">
                            <div className="card-header text-center">
                                <b>Order Laundry Terbanyak</b>
                            </div>
                            <div className="card-body text-center">
                                <table className="table table-primary">
                                    <thead>
                                        <tr>
                                            <td>No</td>
                                            <td>Nama Pemesan</td>
                                            <td>Jumlah Pesanan</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customerMost.map((customer, index) => (
                                            <tr key={customer._id}>
                                                <td>{index + 1}</td>
                                                <td>{customer._id}</td>
                                                <td>{customer.totalPesanan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* **** */}

                {/* Grafik Jenis Terbanyak*/}
                <div className="col-md-3 d-flex justify-content-center align-items-center">

                    <div className="col-md-8">
                        <div className="card card-primary">
                            <div className="card-header text-center">
                                <b>Jenis Terbanyak yang Dipesan</b>
                            </div>
                            <div className="card-body text-center">
                                <Pie data={chartDataPie} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* **** */}

                {/* Status*/}
                <div className="col-md-6 d-flex justify-content-center align-items-center gap-3">

                    <div className="col">
                        <div className="card card-primary">
                            <div className="card-header text-center">
                                <b>Pesanan Berhasil</b>
                            </div>
                            <div className="card-body text-center">
                                <h4>{pesananBerhasil}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card card-primary">
                            <div className="card-header text-center">
                                <b>Pesanan Diproses</b>
                            </div>
                            <div className="card-body text-center">
                                <h4>{pesananProses}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card card-primary">
                            <div className="card-header text-center">
                                <b>Pesanan Ditolak</b>
                            </div>
                            <div className="card-body text-center">
                                <h4>{pesananGagal}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {/* **** */}

                {/* Pendapatan PerBulan*/}
                <div className="col-md-3 d-flex justify-content-center align-items-center">

                    <div className="col">
                        <div className="card card-primary">
                            <div className="card-header text-center">
                                <b>Pendapatan per Bulan</b>
                            </div>
                            <div className="card-body text-center">
                                <Line data={chartDataIncome} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* **** */}
            </div>
        </div>
    );
}


export default Home;