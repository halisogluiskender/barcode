import AsyncCreatableSelect from "react-select/async-creatable";
import { StylesConfig } from "react-select";
import { useAppContext } from "context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";

function SelectBox({ selectRef }) {
  const { company, setCompany } = useAppContext();

  const [Firmalar, setFirmalar] = useState([]);
  const firmaCek = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}Firmalar`,
    );
    setFirmalar(data);
  };
  useEffect(() => {
    firmaCek();
  }, []);

  const filterColors = function (inputValue) {
    return Firmalar.filter(function (i) {
      return i.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  };
  const promiseOptions = function (inputValue) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(filterColors(inputValue));
      }, 1000);
    });
  };

  const colourStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      border: "none",
      borderRadius: "0.125rem",
      padding: "6px",
    }),
    placeholder: (styles) => ({ ...styles, color: "#9CA3AF" }),
  };
  return (
    <>
      <AsyncCreatableSelect
        isClearable
        loadingMessage={() => "Yükleniyor..."}
        noOptionsMessage={() => "Lütfen birkaç harf yazın!"}
        formatCreateLabel={(inputValue) => `Ekle: "${inputValue}"`}
        loadOptions={promiseOptions}
        onChange={(e) => setCompany({ ...company, firma_name: e })}
        value={company.label}
        className="w-full shadow-sm"
        styles={colourStyles}
        placeholder="Firma Seçin!"
        name="firma"
        ref={selectRef}
      />
    </>
  );
}

export default SelectBox;
