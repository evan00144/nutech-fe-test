import { Col, Row } from "react-bootstrap";
import { fetchData } from "../service/service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { setUser } from "../redux/reducer";

export default function AccountInfo() {
  const user = useSelector((state: RootState) => state.item.user);

  const dispatch = useDispatch();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchDataAndUpdateProfile = async (url: string) => {
      try {
        const res = await fetchData(url);
        const data = await res.json();
        setProfile((prevProfile: any) => ({
          ...prevProfile,
          ...data?.data,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserData = async () => {
      try {
        await fetchDataAndUpdateProfile(
          "https://take-home-test-api.nutech-integrasi.app/profile"
        );
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserBalance = async () => {
      try {
        await fetchDataAndUpdateProfile(
          "https://take-home-test-api.nutech-integrasi.app/balance"
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (!user) {
      fetchUserData();
      fetchUserBalance();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      dispatch(setUser(profile));
    }
  }, [dispatch, profile]);

  return (
    <Row className="align-items-center mb-5">
      <Col sm={5}>
        <img
          alt=""
          className="mb-5"
          width={72}
          src={process.env.PUBLIC_URL + "/assets/Profile Photo.png"}
        />
        <h5 className="mb-1 fw-light">Selamat Datang,</h5>
        <h2>
          {user?.first_name} {user?.last_name}
        </h2>
      </Col>
      <Col sm={7}>
        <div
          className="text-white"
          style={{
            position: "relative",
            padding: "1.9rem",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/Background Saldo.png"}
            className="position-absolute w-100 h-100 top-0 start-0"
            style={{
              zIndex: -1,
            }}
            alt=""
          />
          <h6>Saldo Anda</h6>
          <h2 className="mb-3">
            Rp{" "}
            <span
              style={{
                fontSize: "2rem",
                lineHeight: 0.2,
              }}
            >
              {user?.balance}
            </span>
          </h2>
          <h6
            style={{
              fontSize: ".7rem",
              marginBottom: 0,
            }}
          >
            Lihat Saldo
          </h6>
        </div>
      </Col>
    </Row>
  );
}
