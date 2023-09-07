import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import AccountInfo from "../components/AccountInfo";

export default function TopUpPage() {
  const pilihanNominal = [
    "10.000",
    "20.000",
    "50.000",
    "100.000",
    "250.000",
    "500.000",
  ];
  return (
    <>
      <AccountInfo />
      <h5 className="fw-light mb-0">Silahkan Masukan</h5>
      <h2 className="mb-5">Nominal Top Up</h2>

      <Row>
        <Col sm={8}>
          <Row className="gy-4">
            <Col sm={12}>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
            <Col sm={12}>
              <Button className="w-100 text-white">Top Up</Button>
            </Col>
          </Row>
        </Col>
        <Col sm={4}>
          <Row className="h-100 gy-4">
            {pilihanNominal?.map((e, index) => (
              <Col key={index} sm={4}>
                Rp.{e}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}
