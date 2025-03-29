"use client";

import Image from "next/image";
import { Greet } from "./components/greet";
import { Counter } from "./components/counter";
import { useState, useEffect, useRef } from "react";
import AutoNumeric from "autonumeric";

const Home = () => {
  const [jenisP, setJenisP] = useState("");
  const [showBerat, setShowBerat] = useState(false);
  const [showBanyak, setShowBanyak] = useState(false);
  const [harga, setHarga] = useState(0);
  const [berat, setBerat] = useState(0);
  const [banyak, setBanyak] = useState(0);

  const changeDD = (jenis: string) => {
    setJenisP(jenis);
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
    var maxValue=1000;
    if (kuantitas != 0) {
      if (jenisP == "pakaian") {
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
      if (jenisP == "pakaian") {
        setBerat(0);
        setHarga(0);
      }
      else {
        setBanyak(0);
        setHarga(0);
      }
    }
  }


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
      <div className="col-5">
        <div className="card card-primary">
          <div className="card-head">
            <h1 className="text-3xl text-center">
              Form Laundry
            </h1>
            <hr />
          </div>
          <form method="post" action={"/SaveOrder"}>
            <div className="card-body">

              <div className="d-flex justify-content-center align-items-center">
                <label className="col-md-2 me-3 text-start"> Nama <b className="text-danger">*</b> </label>
                <input type="text" name="nama" className="form-control w-75" placeholder="Nama Pemesan Laundry" required></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2 me-3">Alamat  <b className="text-danger">*</b></label>
                <textarea name="alamat" className="form-control w-75" placeholder="Alamat Pengiriman Laundry" required></textarea>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2 me-2">No Telepon  <b className="text-danger">*</b></label>
                <input type="text" name="notelp" className="form-control w-75 auto-numericHP" placeholder="Nomor Telepon Pemesan Laundry" required></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2  me-2">Email  </label>
                <input type="text" name="email" className="form-control w-75" placeholder="Email Pemesan Laundry (Optional)"></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2  me-2">Jenis Pakaian  <b className="text-danger" >*</b></label>
                <select className="form-control w-75" id="jenisP" onChange={(e) => changeDD(e.target.value)} value={jenisP} required>
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