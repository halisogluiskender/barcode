import { useAppContext } from "context/AppContext";
import { Link } from "react-router-dom";
function Navbar() {
  const { auth, LogOut, company } = useAppContext();
  return (
    <>
      {auth.loggedIn ? (
        <div className="bg-white h-[55px] flex flex-nowrap shadow-sm">
          <Link
            to={
              company.status
                ? `${process.env.PUBLIC_URL}/urunlistesi`
                : `${process.env.PUBLIC_URL}/musterilistesi`
            }
            className=" h-full w-4/12 flex flex-col items-center justify-center text-sm opacity-60 active:opacity-100"
          >
            <img
              src={`${process.env.PUBLIC_URL}/file.png`}
              alt="Okutulanlar"
              className="w-[20px] mb-[2px]"
            />
            Okutulanlar
          </Link>
          <div className="h-full flex-1 relative">
            <Link
              to={
                company.status
                  ? `${process.env.PUBLIC_URL}/urunsec`
                  : `${process.env.PUBLIC_URL}/home`
              }
              className="rounded-full w-[60px] h-[60px] bg-white left-0 bottom-1/4 right-0 m-auto absolute shadow-md bg-gradient-to-t from-blue-700 outline-none to-blue-400 active:bg-gradient-to-t active:from-slate-500 active:to-slate-500 flex items-center justify-center p-2"
            >
              <img
                src={`${process.env.PUBLIC_URL}/barcode_icon.png`}
                alt="Barkod"
                className="w-full"
              />
            </Link>
          </div>
          <Link
            onClick={LogOut}
            className=" h-full w-4/12 flex flex-col items-center justify-center  text-sm opacity-60 active:opacity-100"
          >
            <img
              src={`${process.env.PUBLIC_URL}/logout.png`}
              alt="Log Out"
              className="w-[20px] mb-[2px]"
            />
            Çıkış
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
