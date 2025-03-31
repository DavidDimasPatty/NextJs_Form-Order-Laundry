"use client"
import React, { useState } from "react";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("api/LoginAdmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                { username, password }
            ),
        });

        const data = await response.json();
        if (response.ok) {
            window.location.href="/Admin/Home"
        } else {
            console.log(data);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="col-3">
                <form onSubmit={() => handleSubmit}>
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-center align-items-center">
                                <label className="col-md-2 me-3 text-start"> Username  </label>
                                <input type="text" name="nama" className="form-control w-75" placeholder="Username Admin" required value={username} onChange={(e) => setUsername(e.target.value)}></input>
                            </div>

                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <label className="col-md-2 me-3 text-start"> Password </label>
                                <input type="text" name="nama" className="form-control w-75" placeholder="Password Admin" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-info">Log In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;