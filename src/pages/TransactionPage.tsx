import React from "react";
import AccountInfo from "../components/AccountInfo";

export default function TransactionPage() {
  return (
    <>
      <AccountInfo />
      <h5 className="fw-bold mb-4">Semua Transaksi</h5>

      <div className="card-transaksi">
        <div>
          <div className="jumlah">10</div>
          <div className="tanggal">20 agustus</div>
        </div>
        <span>jenis transaksi</span>
      </div>
    </>
  );
}
