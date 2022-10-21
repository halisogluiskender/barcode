import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [click, setClick] = useState(false);
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("UserAuth")) || {
      email: "",
      token: "",
      loggedIn: false,
    },
  );
  const [company, setCompany] = useState(
    JSON.parse(localStorage.getItem("Company")) || {
      imageSrc: "",
      firma_name: {
        value: "",
        label: "",
      },
      firma_not: "",
      Barkods: [],
      status: false,
    },
  );
  const [decode, setDecode] = useState({
    decodedText: "",
    formInput: {
      metre: "",
      renk: "",
      not: "",
    },
  });
  const LogOut = () => {
    localStorage.removeItem("UserAuth");
    localStorage.removeItem("Company");
    window.location.reload();
  };

  const MusteriKayitBitir = () => {
    localStorage.removeItem("Company");
    window.location.replace("/");
  };

  const [musteriler, setMusteriler] = useState([]);
  const [urunler, setUrunler] = useState("");
  const values = {
    auth,
    setAuth,
    LogOut,
    company,
    setCompany,
    click,
    setClick,
    setDecode,
    decode,
    setMusteriler,
    musteriler,
    setUrunler,
    urunler,
    MusteriKayitBitir,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
