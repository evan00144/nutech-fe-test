import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar className="border-bottom py-2 mb-5">
      <Container>
        <NavLink to={"/"}>
          <Navbar.Brand as={'div'}>
            <img
              alt=""
              width={32}
              src={process.env.PUBLIC_URL + "/assets/Logo.png"}
            />{" "}
            <span className="fw-bold">SIMS PPOB</span>
          </Navbar.Brand>
        </NavLink>
        <Nav className="ms-auto gap-5">
          <NavLink to={"/topup"}>Top Up</NavLink>
          <NavLink to={"/transaksi"}>Transaction</NavLink>
          <NavLink to={"/profile"}>Akun</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
