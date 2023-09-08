import React from "react";

export default function ModalSuccessFail({
  success,
  desc,
  nominal,
  handleClose,
}: any) {
  return (
    <>
      <div className="text-center">
        <img
          alt=""
          width={56}
          className="mb-2"
          src={`${process.env.PUBLIC_URL}/assets/${success? "success.png" : "error.png"} `}
        />
        <p>{desc}</p>
        <h4 className="fw-bold mb-2">Rp. {nominal}</h4>
        <p>{success ? "sukses" : "gagal"}</p>

        <div
          onClick={handleClose}
          className="text-primary cursor-pointer"
        >
          Kembali Ke Beranda
        </div>
      </div>
    </>
  );
}
