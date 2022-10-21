import axios from "axios";
import { useAppContext } from "context/AppContext";
import { toast } from "wc-toast";

function UrunForm({ handleStop, showBarcode }) {
  const { decode, setDecode, setCompany, company } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const frmData = new FormData(e.target);
    const formInput = Object.fromEntries(frmData.entries());
    if (company.status) {
      if (decode.decodedText !== "") {
        setDecode({ ...decode, formInput });
        setCompany({
          ...company,
          Barkods: [...company.Barkods, { ...decode }],
        });
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, {
          company: {
            ...company,
            Barkods: [...company.Barkods, { ...decode }],
          },
          action: "UrunAdd",
        });
        if (data.company.status) {
          toast.success("Ürün Başarıyla Eklendi!");
          localStorage.setItem(
            "Company",
            JSON.stringify({
              ...company,
              Barkods: [...company.Barkods, { ...decode }],
            }),
          );
          setDecode({
            decodedText: "",
            formInput: {
              metre: "",
              renk: "",
              not: "",
            },
          });
        }
      } else {
        toast.error("Lütfen Barkot taratın!");
      }
    } else {
      toast.error("Önce Müşteri Seçin!");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDecode({
      ...decode,
      formInput: { ...decode.formInput, [e.target.name]: e.target.value },
    });
  };

  return (
    <>
      <wc-toast></wc-toast>
      <div className="pl-10 pr-10 pt-10">
        {showBarcode && (
          <button
            className="button mb-4 !bg-gray-400 !text-gray-900 flex items-center justify-center gap-4"
            onClick={() => handleStop()}
          >
            Taramayı Temizle
          </button>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label>
            <div className="flex flex-nowrap gap-4">
              <input
                type="number"
                placeholder="Metre"
                name="metre"
                className="input"
                value={decode.formInput.metre}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                type="text"
                placeholder="Renk"
                name="renk"
                value={decode.formInput.renk}
                onChange={handleChange}
                className="input"
                autoComplete="off"
              />
            </div>
          </label>
          <label>
            <div>
              <input
                type="text"
                placeholder="Not"
                name="not"
                value={decode.formInput.not}
                onChange={handleChange}
                className="input "
                autoComplete="off"
              />
            </div>
          </label>
          <button className="button">Ürün Ekle</button>
        </form>
      </div>
    </>
  );
}

export default UrunForm;
