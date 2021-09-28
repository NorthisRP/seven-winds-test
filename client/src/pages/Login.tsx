import React, { useState } from "react";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import { ILogin } from "../types/types";
import { useAuth } from "./../hooks/useAuth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useInput } from "./../hooks/useInput";
import { Link } from "react-router-dom";
import "../styles/form.scss";

export default function Login() {
  const [error, setError] = useState("");
  const auth = useAuth();
  const login = useInput("");
  const password = useInput("");

  function loginHandler() {
    if (!(login.value && password.value)) {
      return setError("Поля должны быть заполнены!");
    }
    axios
      .post("/api/auth/login", {
        login: login.value,
        password: password.value,
      })
      .then((res: AxiosResponse<ILogin>) => {
        auth.login(res.data);
      })
      .catch((err: AxiosError) => setError(err.response?.data.message));
  }
  return (
    <div className="form">
      <h1>Login</h1>
      <TextField variant="outlined" label="Login" {...login.bind} />
      <TextField variant="outlined" label="Password" {...password.bind} />
      <Button color="success" variant="contained" onClick={loginHandler}>
        Login
      </Button>
      <Link to="/register">Register</Link>
      <Snackbar
        open={!!error}
        autoHideDuration={1400}
        onClose={() => setError("")}
      >
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
