import axios from "axios";
import { useAppContext } from "context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "wc-toast";

function BoxItem({ to, title, renk, metre, delData }) {
  const { musteriler, setMusteriler, setCompany, setUrunler, urunler } =
    useAppContext();
  const Delete = async () => {
    const MusteriId = delData.musteri;
    const urunBarkod = delData.urun;
    if (MusteriId && !urunBarkod) {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        MusteriId,
        action: "MusteriSil",
      });
      data.response && toast.success(data.response);
      setMusteriler(musteriler.filter((musteri) => musteri.ID !== MusteriId));
    }
    if (urunBarkod) {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        urunBarkod,
        MusteriId,
        action: "UrunSil",
      });
      if (data.response) {
        toast.success(data.response);
        const Barkods = urunler.barkods.filter((urun) => {
          return urun.decodedText.BARKOT !== urunBarkod;
        });
        setUrunler({
          id: urunler.id,
          action: urunler.action,
          firma_name: urunler.firma_name,
          barkods: Barkods,
          status: urunler.status,
        });
        setCompany(data.Company.company);
        if (localStorage.getItem("Company")) {
          localStorage.setItem("Company", JSON.stringify(data.Company.company));
        }
      }
    }
  };
  return (
    <>
      <wc-toast></wc-toast>
      <div className="BoxItem flex flex-nowrap bg-white shadow-sm rounded-sm">
        <div className="flex-1 p-4 flex flex-col items-start justify-center ">
          <Link to={to} className="w-full">
            {title && (
              <div className="w-full font-bold text-md text-gray-600 ">
                {title}
              </div>
            )}
            {renk && <div className="text-gray-400">{renk}</div>}
            {metre && <div className="text-gray-400">{metre}</div>}
          </Link>
        </div>
        <button
          onClick={Delete}
          className="pl-5 pr-5 bg-[#eee] rounded-r-sm flex justify-center items-center"
        >
          <img src={`/delete_icon.png`} alt="Delete" className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default BoxItem;
