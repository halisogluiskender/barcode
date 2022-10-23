import { useAppContext } from "context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const { auth } = useAppContext();
  return auth && auth.loggedIn;
};

function AuthControl() {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={process.env.PUBLIC_URL} replace />;
}

export default AuthControl;
