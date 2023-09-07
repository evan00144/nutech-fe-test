import { InputGroup, Form, Button } from "react-bootstrap";
import AccountInfo from "../components/AccountInfo";

export default function PembelianPage() {
  return (
    <>
      <AccountInfo />
      <h5 className="fw-light">Pembayaran</h5>
      <div className="d-flex align-items-center gap-3 mb-4">
        <img
          width={32}
          src={process.env.PUBLIC_URL + `/assets/Listrik.png`}
          alt=""
        />
        <div className="fw-bold" style={{}}>
          Listrik Prabayar
        </div>
      </div>
      <InputGroup className="mb-4">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Button className="w-100 mb-5 text-white">Bayar</Button>
    </>
  );
}
