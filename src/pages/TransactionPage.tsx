import React, { useCallback, useEffect, useState } from "react";
import AccountInfo from "../components/AccountInfo";
import { fetchData } from "../service/service";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const getTransaction = useCallback(async () => {
    try {
      const res = await fetchData(
        `https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=${page}&limit=5`
      );
      const data = await res.json();
      setTransactions(data?.data?.records);
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  useEffect(() => {
    getTransaction();
  }, [getTransaction, page]);

  const getDate = (string: string) => {
    const inputDateStr = string;
    const date = new Date(inputDateStr);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const formattedDateStr = `${day} ${month} ${year} ${hours}:${minutes} WIB`;
    return formattedDateStr;
  };
  return (
    <>
      <AccountInfo />
      <h5 className="fw-bold mb-4">Semua Transaksi</h5>
      {transactions?.map((e: any, index) => (
        <div className="card-transaksi mb-3" key={index}>
          <div>
            <div
              className={`jumlah ${
                e?.transaction_type === "PAYMENT" ? "red" : ""
              }`}
            >
              {e?.transaction_type === "PAYMENT" ? "-" : "+"} Rp.
              {e?.total_amount}
            </div>
            <div className="tanggal">{getDate(e?.created_on)}</div>
          </div>
          <span
            style={{
              fontSize: ".8rem",
            }}
          >
            {e?.description}
          </span>
        </div>
      ))}
      <div
        onClick={() => setPage((prev) => prev+1)}
        className="text-center cursor-pointer text-primary"
      >
        Show More
      </div>
    </>
  );
}
