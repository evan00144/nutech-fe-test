import React from "react";

export default function NotificationWarn({
  title,
  nominal,
  handleConfirm,
  handleClose
}: any) {
  return (
    <>
      <div className="text-center">
        <img
          alt=""
          width={56}
          className="mb-3"
          src={process.env.PUBLIC_URL + "/assets/Logo.png"}
        />
        <p className="mb-1">{title}</p>
        <h4 className="fw-bold mb-4">Rp. {nominal}?</h4>
        <div onClick={handleConfirm} className="text-primary mb-4 cursor-pointer">
          Ya, Lanjutkan Top Up
        </div>

        <div onClick={handleClose} style={{
            color:'lightgrey'
        }} className="cursor-pointer">
          Batalkan
        </div>
      </div>
    </>
  );
}
