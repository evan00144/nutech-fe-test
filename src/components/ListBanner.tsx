import React, { useEffect } from "react";
import { RootState } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../service/service";
import { setBanner } from "../redux/reducer";

export default function ListBanner() {
  const banner = useSelector((state: RootState) => state.item.banner);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetchData(
          "https://take-home-test-api.nutech-integrasi.app/banner"
        );
        const data = await res.json();
        dispatch(setBanner(data?.data));
      } catch (error) {
        console.error(error);
      }
    };
    if (!banner) {
      fetchBanner();
    }
  }, [dispatch, banner]);


  return (
    <>
      <h6 className="mb-4">Temukan Promo Menarik</h6>

      <div className="d-flex gap-4 overflow-auto">
        {banner?.map((e, index) => (
          <img src={e?.banner_image} key={index} alt="" />
        ))}
      </div>
    </>
  );
}
