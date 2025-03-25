import Image from "next/image";
import { Greet } from "./components/greet";
import { Counter } from "./components/counter";
export default function Home() {
  return (
    <div className="card card-primary">
      <div className="card-head">
        <h1 className="text-3xl">
          Form Laundry
        </h1>
      </div>
      <form method="post" action={"/SaveOrder"}>
        <div className="card-body">
          <div className="d-flex justify-content-center align-items-center">
            <label>Nama : </label>
            <input type="text" name="nama" className="form-control"></input>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <label>Alamat : </label>
            <input type="text" name="alamat" className="form-control"></input>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <label>No Telepon : </label>
            <input type="text" name="notelp" className="form-control"></input>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <label>Email : </label>
            <input type="text" name="email" className="form-control"></input>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <label>Banyak Pakaian : </label>
            <input type="text" name="banyakP" className="form-control"></input>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <label>Berat Pakaian : </label>
            <input type="text" name="beratP" className="form-control"></input>
          </div>
        </div>
        <div className="card-footer">
          <input type="submit" className="btn btn-primary">Simpan</input>
        </div>
      </form>
    </div>
  );
}
