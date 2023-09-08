import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import AccountInfo from "../components/AccountInfo";
import ModalComponent from "../components/ModalComponent";
import NotificationWarn from "../components/NotificationWarn";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchData } from "../service/service";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducer";
import ModalSuccessFail from "../components/ModalSuccessFail";

export default function TopUpPage() {
  const { register, watch, setValue } = useForm();
  const dispatch = useDispatch();
  const watchNominal = watch("top_up_amount");
  const pilihanNominal = [
    "10.000",
    "20.000",
    "50.000",
    "100.000",
    "250.000",
    "500.000",
  ];
  const [modal, setModal] = useState({
    show: false,
  });

  const [successFail, setSuccessFail] = useState({
    success: false,
    desc: "",
    nominal: 0,
  });

  const [modalNotif, setModalNotif] = useState({
    show: false,
  });
  const handleClickTopup = () => {
    setModal((prev) => {
      return {
        ...prev,
        show: true,
      };
    });
  };
  const handleCloseModal = () => {
    setModal((prev) => {
      return {
        ...prev,
        show: false,
      };
    });
    setModalNotif((prev) => {
      return {
        ...prev,
        show: false,
      };
    });
  };
  const handleConfirm = async () => {
    try {
      const res = await fetchData(
        "https://take-home-test-api.nutech-integrasi.app/topup",
        {
          method: "post",
          body: JSON.stringify({
            top_up_amount: Number(watchNominal),
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuccessFail({
          success: true,
          desc: 'Top Up Sebesar',
          nominal: watchNominal,
        });
        setModalNotif((prev) => {
          return {
            ...prev,
            show: true,
          };
        });
        dispatch(setUser(data?.data));
        return;
      }

      setSuccessFail({
        success: false,
        desc: 'Top Up Sebesar',
        nominal: watchNominal,
      });
      setModalNotif((prev) => {
        return {
          ...prev,
          show: true,
        };
      });
    } catch (e) {
      console.log(e);
    } finally {
      setValue("top_up_amount", "");
      setModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
      setTimeout(() => {}, 1500);
    }
  };
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
                <InputGroup.Text id="basic-addon1">Rp</InputGroup.Text>
                <Form.Control
                  placeholder="Nominal Top Up"
                  {...register("top_up_amount")}
                />
              </InputGroup>
            </Col>
            <Col sm={12}>
              <Button
                disabled={!watchNominal}
                onClick={handleClickTopup}
                className="w-100 text-white"
              >
                Top Up
              </Button>
            </Col>
          </Row>
        </Col>
        <Col sm={4}>
          <Row className="h-100 gy-4">
            {pilihanNominal?.map((e, index) => (
              <Col key={index} sm={4}>
                <div
                  style={{
                    padding: ".75rem",
                  }}
                  onClick={() => setValue("top_up_amount", e)}
                  className="border cursor-pointer text-center rounded"
                >
                  Rp.{e}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <ModalComponent modal={modal}>
        <NotificationWarn
          title={"Anda yakin untuk Top Up sebesar"}
          nominal={watchNominal}
          handleConfirm={handleConfirm}
          handleClose={handleCloseModal}
        />
      </ModalComponent>

      <ModalComponent modal={modalNotif}>
        <ModalSuccessFail
          handleClose={handleCloseModal}
          success={successFail?.success}
          desc={successFail?.desc}
          nominal={successFail?.nominal}
        />
      </ModalComponent>
    </>
  );
}
