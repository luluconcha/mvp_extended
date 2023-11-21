import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth.js";
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const { onLogin } = useAuth();
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState(null);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("api/auth/login", {
        method: "POST",
        data: credentials,
      })
      console.log(data)

      localStorage.setItem("token", data.token);
      onLogin();
      navigate({pathname: "/private"})
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    console.log("Logged out");
  };

  const signup = async () => {
    try {
      const { data } = await axios("api/auth/register", {
        method: "POST",
        data: credentials,
      })
      console.log(data)
      return data.message
    } catch (err) {
      return err
    }
  }

  const requestData = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="login">
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button onClick={login}>
            login
          </button>
          <button onClick={signup}>
            signup 
          </button>
        </div>
      </div>
      <div className="text-center p-4">

      </div>
    </div>
  );
}

export default Login;
