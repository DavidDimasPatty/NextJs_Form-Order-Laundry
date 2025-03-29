import Image from "next/image";
import { Greet } from "./components/greet";
import { Counter } from "./components/counter";
export default function Home() {

  
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
                <input type="text" name="nama" className="form-control w-75" placeholder="Nama Pemesan Laundry"></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2 me-3">Alamat  <b className="text-danger">*</b></label>
                <textarea name="alamat" className="form-control w-75" placeholder="Alamat Pengiriman Laundry"></textarea>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2 me-2">No Telepon  <b className="text-danger">*</b></label>
                <input type="text" name="notelp" className="form-control w-75" placeholder="Nomor Telepon Pemesan Laundry"></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2  me-2">Email  </label>
                <input type="text" name="email" className="form-control w-75" placeholder="Email Pemesan Laundry (Optional)"></input>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-2  me-2">Jenis Pakaian  <b className="text-danger">*</b></label>
                <select className="form-control w-75" id="jenisP">
                  <option selected disabled style={{ color: "red" }}>---Mohon Pilih Jenis Pakaian---</option>
                  <option value="pakaian">Pakaian (Baju, Celana, Kemeja, dll)</option>
                  <option value="sepatu">Sepatu</option>
                  <option value="selimut">Selimut</option>
                  <option value="karpet">Karpet</option>
                </select>
              </div>

              <div className="d-none" id="divBanyakP">
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <label className="col-md-2  me-2">Banyak Pakaian  <b className="text-danger">*</b></label>
                  <input type="text" name="banyakP" className="form-control w-75" placeholder="Banyak Pakaian (Mohon Konfirmasi Penjaga Laundry)"></input>
                </div>
              </div>

              <div className="d-none" id="divBeratP">
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <label className="col-md-2  me-2">Berat Pakaian  <b className="text-danger">*</b></label>
                  <input type="text" name="beratP" className="form-control w-75" placeholder="Berat Pakaian (Mohon Konfirmasi Penjaga Laundry)"></input>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="col-md-4  me-2">Kalkulasi Harga = </label>
                <h4 className="text-danger">Rp. 0</h4>
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
