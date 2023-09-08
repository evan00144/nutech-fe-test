import { InputGroup, Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { fetchData } from "../service/service";
import { useState } from "react";
import AlertBox from "../components/AlertBox";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

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
    try {
      const res = await fetchData(
        "https://take-home-test-api.nutech-integrasi.app/login",
        {
          method: "POST",
          body: JSON.stringify(params),
        }
      );
      const data = await res.json();
      if (res.ok) {
        const decoded: {} = jwtDecode(data?.data?.token);
        const token = {
          token: data?.data?.token,
          ...decoded,
        };
        localStorage.setItem("token", JSON.stringify(token));
        setAlert((prev) => {
          return {
            ...prev,
            show: true,
            message: data?.message,
            success: true,
          };
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      setAlert((prev) => {
        return {
          ...prev,
          show: true,
          message: data?.message,
        };
      });
    } catch (e) {
      console.log(e)
      setAlert((prev) => {
        return {
          ...prev,
          show: true,
          message: "Error",
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
    <div className="d-flex flex-column h-100 align-items-center justify-content-center p-5 position-relative">
      <div className="d-flex align-items-center gap-2 mb-5">
        <img
          alt=""
          width={45}
          src={process.env.PUBLIC_URL + "/assets/Logo.png"}
        />
        <h2 className="mb-0">SIMS PPOB</h2>
      </div>
      <div className="login-form-container">
        <h1 className="mb-5 text-center">Masuk atau buat akun untuk memulai</h1>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputGroup className="mb-5">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Email"
              {...register("email")}
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              placeholder="Password"
              type="password"
              {...register("password")}
            />
          </InputGroup>
          <Button className="w-100 mb-5 text-white" type="submit">
            Masuk
          </Button>
        </Form>
      </div>

      <p>
        belum punya akun? registrasi{" "}
        <Link to='/auth/register' className="text-primary text-unstyled">
          disini
        </Link>
      </p>
      <AlertBox alert={alert} handleExitAlert={handleExitAlert} />
    </div>
  );
}
