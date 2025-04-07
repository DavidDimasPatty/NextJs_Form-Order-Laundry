"use client"
import React, { useState } from "react";
import "@/app/styles/admin.css"
const Layout = ({ children }: { children: React.ReactNode }) => {
    const [navbar, navbarClick] = useState(true);
    return (
        <div className="navbarAdmin">
            <div className="wrappernav">
                {navbar ? (
                    <div className={`navbarBurgerAdmin`} onClick={() => navbarClick(!navbar)}>
                        ≡
                    </div>
                )
                    :
                    <div className={`navbarBurgerOpenAdmin ${navbar ? "" : "active"}`} onClick={() => navbarClick(!navbar)}>
                        <div className="tombolXAdmin">
                            X
                        </div>
                        <div className="menuNavbarAdmin">
                            <ul>
                                <li><a className="homeAdmin" href="/Admin/Home">Home</a></li>
                                <li><a className="homeAdmin" href="/Admin/Home/DaftarPesanan">Daftar Pesanan</a></li>
                                <li><a className="homeAdmin" href="/Admin/Home/HistoryDaftarPesanan">Riwayat Daftar Pesanan</a></li>
                                <li><a className="homeAdmin" href="/Admin/Login">Log Out</a></li>
                            </ul>
                        </div>
                    </div>
                }
            </div>            
            {children}
        </div>
    )
}

export default Layout;