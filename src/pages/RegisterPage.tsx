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
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              {...register("first_name")}
              placeholder="Nama Depan"
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              {...register("last_name")}
              placeholder="Nama Belakang"
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="password"
              {...register("password")}
              placeholder="Buat Password"
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text>@</InputGroup.Text>
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
        <Link to="/auth/register" className="text-primary text-unstyled">
          disini
        </Link>
      </p>
      <AlertBox alert={alert} handleExitAlert={handleExitAlert} />
    </div>
  );
}
