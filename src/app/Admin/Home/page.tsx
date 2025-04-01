"use client"
import React, { useEffect, useState } from "react";


const Home = () => {
    const [totalPesan, setTotalPesan] = useState(0);
    const [totalPemasukan, setTotalPemasukan] = useState(0);

    useEffect(() => {
        const totalPesananData = async () => {
            const response = await fetch("/api/totalPesanan");
            const result = await response.json();

            if (result.data) {
                setTotalPesan(result.data)
            }
            else {
                setTotalPesan(0)
            }
        }

        const totalPemasukanData = async () => {
            const response = await fetch("/api/totalPemasukan");
            const result = await response.json();

            if (result.data) {
                setTotalPemasukan(result.data)
            }
            else {
                setTotalPemasukan(0)
            }
        }

        totalPesananData();
        totalPemasukanData();
    })

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="row">
               
                <div className="col-3">
                    <div className="card card-primary">
                        <div className="card-header text-center">
                            Total Pesanan
                        </div>
                        <div className="card-body text-center">
                            {totalPesan}
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card card-primary">
                        <div className="card-header text-center">
                            Total Pemasukan
                        </div>
                        <div className="card-body text-center">
                            {totalPemasukan}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}


export default Home;