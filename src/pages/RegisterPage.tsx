import React, { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { fetchData } from "../service/service";
import AlertBox from "../components/AlertBox";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [alert, setAlert] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handleExitAlert = () => {
    setAlert((prev) => {
      return {
        ...prev,
        show: false,
      };
    });
  };

  const handleSubmitForm = async (data: FieldValues) => {
    const params = {
      ...data,
    };
    if (params?.password !== params?.c_password) {
      setAlert((prev) => {
        return {
          ...prev,
          show: true,
          message: "Password Tidak Sama",
        };
      });
      setTimeout(() => {
        setAlert((prev) => {
          return {
            ...prev,
            show: false,
          };
        });
      }, 3000);
      return;
    }
    delete params.c_password;
    try {
      const res = await fetchData(
        "https://take-home-test-api.nutech-integrasi.app/registration",
        {
          method: "POST",
          body: JSON.stringify(params),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAlert((prev) => {
          return {
            ...prev,
            show: true,
            message: data?.message,
            success: true,
          };
        });
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
        return;
      }

      setAlert((prev) => {
        return {
          ...prev,
          show: true,
          message: data?.message,
        };
      });
    } catch (e) {
      setAlert((prev) => {
        return {
          ...prev,
          show: true,
          message: "Terjadi Permasalahan pada sistem / Koneksi Tidak Stabil",
        };
      });
    }
    setTimeout(() => {
      setAlert((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }, 3000);
  };
  return (
    <div className="d-flex flex-column h-100 align-items-center  p-5 position-relative">
      <div className="d-flex align-items-center gap-2 mb-5">
        <img
          alt=""
          width={45}
          src={process.env.PUBLIC_URL + "/assets/Logo.png"}
        />
        <h2 className="mb-0">SIMS PPOB</h2>
      </div>
      <div className="login-form-container">
        <h1 className="mb-5 text-center">Lengkapi data untuk membuat akun</h1>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputGroup className="mb-5">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="email"
              {...register("email")}
              placeholder="Masukan Email Anda"
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </InputGroup.Text>
            <Form.Control
              {...register("first_name")}
              placeholder="Nama Depan"
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </InputGroup.Text>
            <Form.Control
              {...register("last_name")}
              placeholder="Nama Belakang"
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
            </InputGroup.Text>
            <Form.Control
              type="password"
              {...register("password")}
              placeholder="Buat Password"
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
            </InputGroup.Text>
            <Form.Control
              type="password"
              {...register("c_password")}
              placeholder="Konfirmasi Password "
            />
          </InputGroup>
          <Button className="w-100 mb-5 text-white" type="submit">
            Registrasi
          </Button>
        </Form>
      </div>

      <p>
        sudah punya akun? login{" "}
        <Link to="/auth/login" className="text-primary text-unstyled">
          disini
        </Link>
      </p>
      <AlertBox alert={alert} handleExitAlert={handleExitAlert} />
    </div>
  );
}
