import React from "react";

interface iAlert {
  alert: any;
  handleExitAlert: any;
}
export default function AlertBox({ alert, handleExitAlert }: iAlert) {
  return (
    <>
      {alert?.show && (
        <div
          className={`alert d-flex align-items-center justify-content-between alert-${
            alert?.success ? "success" : "danger"
          } text-${
            alert?.success ? "success" : "danger"
          } position-absolute  bottom-0 mb-5 w-75 `}
          style={{
            left:'50%',
            transform:'translateX(-50%)'
          }}
          role="alert"
        >
          {alert?.message}
          <div onClick={handleExitAlert} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
