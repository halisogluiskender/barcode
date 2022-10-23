import axios from "axios";
import { useAppContext } from "context/AppContext";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "wc-toast";
import SelectBox from "./SelectBox";
function MusteriForm() {
  const { auth, company, setCompany, setClick, click } = useAppContext();
  let navigate = useNavigate();
  const selectRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firma = e.target[1].value;
    if (firma !== "") {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        company,
        email: auth.email,
        action: "MusteriAdd",
      });
      if (data.company.status) {
        toast.success("Müşteri başarıyla eklendi!");
        const ID = data.company.id;
        setCompany({
          ID,
          ...company,
          email: auth.email,
          [e.target[1].name]: e.target[1].value,
          status: true,
        });
        localStorage.setItem(
          "Company",
          JSON.stringify({
            ID,
            ...company,
            email: auth.email,
            [e.target[1].name]: e.target[1].value,
            status: true,
          }),
        );
      }
    } else {
      toast.error("Lütfen bir firma seçiniz!");
      selectRef.current.focus();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      company.status && navigate("/urunsec");
    }, 1000);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [company.status, navigate]);
  return (
    <>
      <wc-toast></wc-toast>
      <div className="p-10 w-full">
        <button
          className="button mb-4 !bg-gray-400 !text-gray-900 flex items-center justify-center gap-4"
          onClick={() => setClick(!click)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/kamera.png`}
            alt="Kamera"
            className="w-8"
          />
          Kamerayı {click ? "Kapat" : "Aç"}
        </button>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label>
            <div className="flex gap-2 w-full">
              <SelectBox selectRef={selectRef} />
            </div>
            {/* <small>Doldurulması zorunlu</small> */}
          </label>
          <label>
            <div>
              <input
                type="text"
                placeholder="Not"
                name="firma_not"
                autoComplete="off"
                onChange={handleChange}
                value={company.firma_not}
                className="input "
              />
            </div>
          </label>
          <button className="button">Muşteri Seç</button>
        </form>
      </div>
    </>
  );
}

export default MusteriForm;
