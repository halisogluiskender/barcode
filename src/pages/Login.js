import { useEffect, useState } from "react";
import { sha256 } from "crypto-hash";
import { useAppContext } from "context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "wc-toast";
const inititalValue = { email: "", token: "" };

function Login() {
  const { setAuth, auth } = useAppContext();
  const [user, setUser] = useState(inititalValue);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashToken = await sha256(user.email);

    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, {
      body: user,
      action: "userSor",
    });
    if (data.body.loggedIn) {
      toast.success("Hoşgeldiniz!");
      setInterval(() => {
        setAuth({ ...user, token: hashToken, loggedIn: true });

        localStorage.setItem(
          "UserAuth",
          JSON.stringify({ ...user, token: hashToken, loggedIn: true }),
        );
      }, 1000);
    } else {
      toast.error("Sisteme kayıtlı bir mail adresi seçin!");
      setUser(inititalValue);
    }
  };
  useEffect(() => {
    auth.loggedIn && navigate(`${process.env.PUBLIC_URL}/home`);
  }, [auth.loggedIn, navigate]);
  return (
    <>
      <wc-toast></wc-toast>
      <div className="loginWrapper">
        <div className="loginInline">
          <h1 className="title">Nilba</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Mail adresiniz!"
              autoComplete="off"
              onChange={handleChange}
              value={user.name}
              required
            />
            <button className="button">Giriş Yap</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
