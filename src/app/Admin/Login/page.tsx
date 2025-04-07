"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from "react";


const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/LoginAdmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                { username, password }
            ),
        });

        const data = await response.json();
        if (response.ok) {
            router.replace("/Admin/Home")
        } else {
            console.log(data);
        }
    };

    return (
        <div className="d-flex h-100 justify-content-center align-items-center">
            <div>
                <div className="d-flex justify-content-center align-items-center text-center">
                    <h3>Selamat Datang Admin Karina Laundry!</h3>
                </div>
                <div className="text-center">
                    <i>Silahkan Login dengan <b className="text-danger">id</b> dan <b className="text-danger">password</b> yang sudah diberikan</i>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3>Login</h3>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <label className="col-md-2 me-3 text-start"> Username  </label>
                                        <input type="text" name="username" className="form-control w-75" placeholder="Username Admin" required value={username} onChange={(e) => setUsername(e.target.value)}></input>
                                    </div>

                                    <div className="d-flex justify-content-center align-items-center mt-3">
                                        <label className="col-md-2 me-3 text-start"> Password </label>
                                        <input type="password" name="password" className="form-control w-75" placeholder="Password Admin" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button className="btn btn-info">Log In</button>
                                    <button type="button" className="btn btn-danger ms-3" onClick={() => window.location.href = "/"}>Back</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;