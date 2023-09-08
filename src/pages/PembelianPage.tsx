import { InputGroup, Form, Button } from "react-bootstrap";
import AccountInfo from "../components/AccountInfo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { useEffect, useState } from "react";
import ModalComponent from "../components/ModalComponent";
import ModalSuccessFail from "../components/ModalSuccessFail";
import NotificationWarn from "../components/NotificationWarn";
import { useForm } from "react-hook-form";
import { fetchData } from "../service/service";
import { setUser } from "../redux/reducer";

export default function PembelianPage() {
  const user = useSelector((state: RootState) => state.item.user);
  const menu = useSelector((state: RootState) => state.item.menuLayanan);
  const { service_code } = useParams();
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    setSelected(menu?.find((e) => e?.service_code === service_code));
  }, [menu, service_code]);

  const { setValue } = useForm();
  const dispatch = useDispatch();
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
  const handleClickBayar = () => {
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
        "https://take-home-test-api.nutech-integrasi.app/transaction",
        {
          method: "post",
          body: JSON.stringify({
            service_code: service_code,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuccessFail({
          success: true,
          desc: `Pembayaran ${selected?.service_name} Sebesar`,
          nominal: data?.data?.total_amount ||0,
        });
        setModalNotif((prev) => {
          return {
            ...prev,
            show: true,
          };
        });
        const balanceTotal:any = {
          balance: Number(user?.balance) - Number(data?.data?.total_amount),
        };
        dispatch(setUser(balanceTotal));
        return;
      }

        setSuccessFail({
          success: false,
          desc: `Pembayaran Listrik Prabayar Sebesar (${user?.balance-selected?.service_tariff <=0 && 'Saldo Tidak Cukup'})`,
          nominal: data?.data?.total_amount || selected?.service_tariff,
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
      <h5 className="fw-light">Pembayaran</h5>
      <div className="d-flex align-items-center gap-3 mb-4">
        <img width={32} src={selected?.service_icon} alt="" />
        <div className="fw-bold" style={{}}>
          {selected?.service_name}
        </div>
      </div>
      <InputGroup className="mb-4">
        <InputGroup.Text id="basic-addon1">Rp</InputGroup.Text>
        <Form.Control
          placeholder="Total"
          aria-describedby="basic-addon1"
          disabled
          defaultValue={selected?.service_tariff}
        />
      </InputGroup>
      <Button onClick={handleClickBayar} className="w-100 mb-5 text-white">
        Bayar
      </Button>

      <ModalComponent modal={modal}>
        <NotificationWarn
          title={`Beli ${selected?.service_name} senilai`}
          nominal={selected?.service_tariff}
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
