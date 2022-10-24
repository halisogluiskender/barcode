import axios from "axios";
import BoxItem from "components/BoxItem";
import { useAppContext } from "context/AppContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function MusteriListe() {
  const { auth, musteriler, setMusteriler } = useAppContext();

  useEffect(() => {
    const musteriCek = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}MusteriCek`,
      );
      setMusteriler(data);
    };
    musteriCek();
  }, [setMusteriler]);
  return (
    <>
      {musteriler.length > 0 ? (
        <>
          <div className="p-5 text-[#8D939E]">
            <h1 className="text-3xl font-semibold">Müşteriler</h1>
            <small className="text-sm">Müşteri Temsilcisi:{auth.email} </small>
          </div>
          <div className="pl-5 pr-5 pb-5 h-full gap-4 flex flex-col">
            {musteriler.map((musteri) => (
              <BoxItem
                to={`${process.env.PUBLIC_URL}/urunlistesi/${musteri.ID}`}
                key={musteri.ID}
                delData={{ musteri: musteri.ID }}
                title={JSON.parse(musteri.CONTENT).company.firma_name.label}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="pl-5 pr-5 h-full gap-4 flex flex-col">
          <div className="flex w-full h-full flex-col items-center justify-center gap-4">
            <p className="text-xl text-gray-600">Hiç kayıt bulunamadı!</p>
            <Link to="/home">
              <div className="rounded-sm shadow-sm pl-8 pr-8 pt-4 pb-4 bg-white">
                Yeni Müşteri Ekle
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default MusteriListe;
