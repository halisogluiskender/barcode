import { useAppContext } from "context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const { auth } = useAppContext();
  return auth && auth.loggedIn;
};

function AuthControl() {
  const isAuth = useAuth();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: process.env.REACT_APP_BASE_URL }} />
  );
}

export default AuthControl;
