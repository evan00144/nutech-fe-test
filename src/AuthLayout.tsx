import { useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const authentication = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication) {
      navigate("/");
    }
  }, [authentication, navigate]);

  return (
    <Row className="vh-100 overflow-hidden g-0">
      <Col className="h-100" sm={6}>
        <Outlet />
      </Col>
      <Col className="h-100" sm={6}>
        <Image
          className=" object-fit-cover h-100 w-100"
          src={process.env.PUBLIC_URL + "/assets/ilustration/Login.png"}
          alt=""
        />
      </Col>
    </Row>
  );
}
