import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AppContextProvider } from "context/AppContext";
import AuthControl from "components/AuthControl";
import Login from "pages/Login";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import UrunSec from "pages/UrunSec";
import UrunListe from "pages/UrunListe";
import MusteriListe from "pages/MusteriListe";
function App() {
  useEffect(() => {
    /* Mobil defterleri yeniden boyutlandırmak için.*/
    // Önce görüntü alanı yüksekliğini alırız ve bir vh birimi için bir değer elde etmek için bunu %1 ile çarparız.
    let vh = window.innerHeight * 0.01;
    // Ardından --vh özel özelliğindeki değeri belgenin köküne ayarlıyoruz.
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // Resize olayını dinliyoruz
    window.addEventListener("resize", () => {
      // Daha önce olduğu gibi aynı betiği çalıştırıyoruz
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);
  return (
    <div className="App">
      <AppContextProvider>
        <main className="Main">
          <Routes>
            <Route path={process.env.PUBLIC_URL} element={<Login />} />
            <Route element={<AuthControl />}>
              <Route
                path={`${process.env.PUBLIC_URL}/home`}
                index
                element={<Home />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/musterilistesi`}
                element={<MusteriListe />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/urunsec`}
                element={<UrunSec />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/urunlistesi`}
                element={<UrunListe />}
              >
                <Route path=":id" element={<UrunListe />} />
              </Route>
            </Route>

            <Route
              path="*"
              element={<Navigate to={process.env.PUBLIC_URL} replace />}
            />
          </Routes>
        </main>
        <Navbar />
      </AppContextProvider>
    </div>
  );
}

export default App;
