import React, { useEffect } from "react";
import { RootState } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../service/service";
import { setMenulayanan } from "../redux/reducer";
import { Link } from "react-router-dom";

export default function ListLayanan() {
  const menu = useSelector((state: RootState) => state.item.menuLayanan);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetchData(
          "https://take-home-test-api.nutech-integrasi.app/services"
        );
        const data = await res.json();
        dispatch(setMenulayanan(data?.data));
      } catch (error) {
        console.error(error);
      }
    };
    if (!menu) {
      fetchMenu();
    }
  }, [dispatch, menu]);

  return (
    <div className="d-flex justify-content-between mb-4">
      {menu?.map((e, index) => (
        <Link to={'/pembelian/'+e?.service_code} key={index}>
        <div className="text-center" >
          <img src={e?.service_icon} alt="" />
          <div
            style={{
              fontSize: ".75rem",
              marginTop: ".5rem",
              width: "10ch",
              lineHeight: "1.1",
              color:'black'
            }}
            >
            {e?.service_name}
          </div>
        </div>
            </Link>
      ))}
    </div>
  );
}
