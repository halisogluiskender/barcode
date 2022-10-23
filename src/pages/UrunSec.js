import UrunForm from "components/UrunForm";
import Screen from "components/Screen";
import BoxItem from "components/BoxItem";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useAppContext } from "context/AppContext";
import axios from "axios";
import { toast } from "wc-toast";
import { useNavigate } from "react-router-dom";
const brConfig = {
  fps: 2,
  qrbox: { width: 300, height: 150 },
};
let html5QrCode;
function UrunSec() {
  let navigate = useNavigate();
  const { decode, setDecode, company } = useAppContext();
  const [showBarcode, setShowBarcode] = useState(false);
  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
  }, []);

  const handleClickAdvanced = () => {
    const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        decodedText,
        action: "UrunSor",
      });
      if (data.success) {
        toast.success("Başarılı işlem!");
        decodedText = data.decodedText;
        setDecode({ ...decode, decodedText });
      } else {
        toast.error("Aranan ürün sistemde mevcut değil!");
      }
    };
    setShowBarcode(true);

    html5QrCode
      .start({ facingMode: "environment" }, brConfig, qrCodeSuccessCallback)
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleStop = (params) => {
    if (params) {
      setDecode("");
    }
    html5QrCode.element !== null &&
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
          setShowBarcode(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
  };
  useEffect(() => {
    !company.status && navigate("/home");
  }, [company.status, navigate]);
  return (
    <>
      <wc-toast></wc-toast>
      <Screen
        src={`${process.env.PUBLIC_URL}/barcode_icon.svg`}
        alt="Screen"
        text="Barkot taramak için tıklayın."
        scanner={false}
        handleClickAdvanced={handleClickAdvanced}
      />
      <UrunForm handleStop={handleStop} showBarcode={showBarcode} />
      {company.Barkods.length > 0 && (
        <>
          <h2 className="w-full text-center pt-9 pb-4 text-2xl text-gray-600 font-semibold">
            Barkot Listesi
          </h2>
          <div className="pl-5 pr-5 pb-4 gap-4 flex flex-col">
            {company.Barkods.map((barkod, i) => (
              <BoxItem
                key={i}
                title={barkod.decodedText.DESEN}
                renk={barkod.formInput.renk}
                metre={`${barkod.formInput.metre} mt`}
                delData={{
                  urun: barkod.decodedText.BARKOT,
                  musteri: company.ID,
                }}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default UrunSec;
