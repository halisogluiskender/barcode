import axios from "axios";
import BoxItem from "components/BoxItem";
import { useAppContext } from "context/AppContext";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "wc-toast";
function UrunListe() {
  const param = useParams();
  const { auth, company, urunler, setUrunler, MusteriKayitBitir } =
    useAppContext();

  const ID = param.id ? param.id : company.ID;

  useEffect(() => {
    const UrunCek = async () => {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        id: ID,
        action: "UrunCek",
      });
      data.status && setUrunler(data);
    };
    UrunCek();
  }, [ID, setUrunler]);

  const handleCancel = () => {
    toast.success("Tüm adımlar başarıyla kayıt edildi!");
    setTimeout(() => {
      MusteriKayitBitir();
    }, 1000);
  };
  return (
    <>
      <wc-toast></wc-toast>
      {urunler.barkods?.length > 0 ? (
        <>
          <div className="p-5 text-[#8D939E]">
            <h1 className="text-3xl font-semibold">{urunler.firma_name}</h1>
            <small className="text-sm">Müşteri Temsilcisi:{auth.email} </small>
          </div>
          <div className="pl-5 pr-5 pb-4 gap-4 flex flex-col">
            {urunler.barkods?.map((uruns, i) => (
              <BoxItem
                key={i}
                title={uruns.decodedText.DESEN}
                renk={uruns.formInput.renk}
                metre={`${uruns.formInput.metre} mt`}
                delData={{
                  urun: uruns.decodedText.BARKOT,
                  musteri: ID,
                }}
              />
            ))}
            {localStorage.getItem("Company") && (
              <button className="button" onClick={handleCancel}>
                İşlemi Sonlandır
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="pl-5 pr-5 h-full gap-4 flex flex-col">
          <div className="flex w-full h-full flex-col items-center justify-center gap-4">
            <p className="text-xl text-gray-600">Hiç kayıt bulunamadı!</p>
            <div className="flex flex-row w-full justify-center items-center gap-2">
              <Link to="/urunsec" className="flex-1">
                <div className="rounded-sm text-lg shadow-sm pl-8 pr-8 pt-3 pb-3 bg-white text-center">
                  Ürün Ekle
                </div>
              </Link>
              {localStorage.getItem("Company") && (
                <button
                  className="button flex-1 !bg-red-300 !font-normal !text-red-800"
                  onClick={handleCancel}
                >
                  İptal et
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UrunListe;
