"use client";

import Image from "next/image";
import { Greet } from "./components/greet";
import { Counter } from "./components/counter";
import { useState, useEffect, useRef } from "react";
import AutoNumeric from "autonumeric";
import "@/app/styles/page.css"

const Home = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHP, setnoHP] = useState("");
  const [email, setEmail] = useState("");
  const [jenis, setJenis] = useState("");
  const [showBerat, setShowBerat] = useState(false);
  const [showBanyak, setShowBanyak] = useState(false);
  const [harga, setHarga] = useState(0);
  const [berat, setBerat] = useState(0);
  const [banyak, setBanyak] = useState(0);
  const [message, setMessage] = useState("");
  const [navbar, navbarClick] = useState(true);
  const changeDD = (jenis: string) => {
    setJenis(jenis);
    if (jenis == "pakaian") {
      setShowBanyak(false)
      setShowBerat(true)
    }
    else {
      setShowBanyak(true)
      setShowBerat(false)
    }
    setHarga(0);
    setBerat(0);
    setBanyak(0);
  }

  const cekHarga = (kuantitasInput: string) => {
    const kuantitasConvert = kuantitasInput.replace(/[^0-9.]/g, "");
    var kuantitas = Number(kuantitasConvert);
    var maxValue = 1000;
    if (kuantitas != 0) {
      if (jenis == "pakaian") {
        if (kuantitas > maxValue) {
          kuantitas = maxValue;
          setBerat(maxValue)
        }
        else {
          setBerat(kuantitas);
        }
        var hargaPakaian = 7000;
        var beratPakaian = 1;
        var tempKuantitas = kuantitas;
        if (tempKuantitas < beratPakaian) {
          tempKuantitas = beratPakaian;
        }
        setHarga((tempKuantitas / beratPakaian) * hargaPakaian)
      }
      else {
        if (kuantitas > maxValue) {
          kuantitas = maxValue;
          setBanyak(maxValue);
        }
        else {
          setBanyak(kuantitas);
        }
        var hargaItem = 15000;
        var tempKuantitas = kuantitas;
        setHarga(tempKuantitas * hargaItem)
      }
    }

    else {
      if (jenis == "pakaian") {
        setBerat(0);
        setHarga(0);
      }
      else {
        setBanyak(0);
        setHarga(0);
      }
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/saveOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { nama, alamat, noHP, email, jenis, banyak, berat, harga }
      ),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Order saved successfully!");
      setNama("")
      setAlamat("")
      setnoHP("")
      setEmail("")
      setHarga(0)
      setJenis("")
      setBerat(0)
      setBanyak(0)
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };


  useEffect(() => {
    AutoNumeric.multiple(".auto-numeric", {
      digitGroupSeparator: ",",
      decimalCharacter: ".",
      decimalPlaces: 2,
      unformatOnSubmit: true,
      leadingZero: "allow",
      maximumValue: "1000",
      minimumValue: "0"
    });

    AutoNumeric.multiple(".auto-numericHP", {
      digitGroupSeparator: "",
      decimalPlaces: 0,
      decimalCharacter: ".",
      unformatOnSubmit: true,
      leadingZero: "keep",
    });
  }, []);



  return (
    <div className="d-flex justify-content-center align-items-center h-100">

      {navbar ? (
        <div className={`navbarBurger`} onClick={() => navbarClick(!navbar)}>
          ≡
        </div>
      )
        :
        <div className={`navbarBurgerOpen ${navbar ? "" : "active"}`} onClick={() => navbarClick(!navbar)}>
          <div className="tombolX">
            X
          </div>
          <div className="menuNavbar">
            <a className="hrefAdmin" href="/Admin/Login">Admin Login</a>
          </div>
        </div>
      }
      <div className="col-5">
        <div className="card card-primary">
          <div className="card-head">
            <h1 className="text-3xl text-center">
              Form Laundry
            </h1>
            <hr />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">

              <div className="d-flex justify-content-center align-items-center">
                <label className="col-md-2 me-3 text-start"> Nama <b className="text-danger">*</b> </label>
                <input type="text" name="nama" className="form-control w-75" placeholder="Nama Pemesan Laundry" required value={nama} onChange={(e) => setNama(e.target.value)}></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2 me-3">Alamat  <b className="text-danger">*</b></label>
                <textarea name="alamat" className="form-control w-75" placeholder="Alamat Pengiriman Laundry" required value={alamat} onChange={(e) => setAlamat(e.target.value)}></textarea>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2 me-2">No Telepon  <b className="text-danger">*</b></label>
                <input type="text" name="notelp" className="form-control w-75 auto-numericHP" placeholder="Nomor Telepon Pemesan Laundry" required value={noHP} onChange={(e) => setnoHP(e.target.value)}></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2  me-2">Email  </label>
                <input type="text" name="email" className="form-control w-75" placeholder="Email Pemesan Laundry (Optional)" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2  me-2">Jenis Pakaian  <b className="text-danger" >*</b></label>
                <select className="form-control w-75" id="jenis" onChange={(e) => changeDD(e.target.value)} value={jenis} required>
                  <option value="" disabled style={{ color: "red" }}>---Mohon Pilih Jenis Pakaian---</option>
                  <option value="pakaian">Pakaian (Baju, Celana, Kemeja, dll)</option>
                  <option value="sepatu">Sepatu</option>
                  <option value="selimut">Selimut</option>
                  <option value="karpet">Karpet</option>
                </select>
              </div>

              {showBanyak ? (
                <div id="divBanyakP">
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <label className="col-md-2  me-2">Banyak Item  <b className="text-danger">*</b></label>
                    <input
                      value={banyak}
                      onChange={(e) => cekHarga(e.target.value)}
                      type="text"
                      name="banyakP"
                      className="form-control w-75 auto-numeric"
                      placeholder="Banyak Pakaian (Mohon Konfirmasi Penjaga)"
                      inputMode="numeric"
                    >
                    </input>
                  </div>
                </div>
              ) : ""}

              {showBerat && (
                <div id="divBeratP">
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <label className="col-md-2  me-2">Berat Pakaian  <b className="text-danger">*</b></label>
                    <div className="input-group w-75">
                      <input
                        value={berat}
                        onChange={(e) => cekHarga(e.target.value)}
                        type="text"
                        name="beratP"
                        className="form-control auto-numeric"
                        placeholder="Berat Pakaian (Mohon Konfirmasi Penjaga)"
                        inputMode="numeric"
                      />
                      <span className="input-group-text">Kg</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2 text-center">Kalkulasi Harga : </label>
                <h4 className="col-md-4 text-danger  text-center">Rp. {harga}</h4>
              </div>

            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;