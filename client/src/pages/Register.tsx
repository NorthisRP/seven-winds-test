import React, { useState } from "react";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useInput } from "./../hooks/useInput";
import { Link } from "react-router-dom";
import "../styles/form.scss";

export default function Register() {
  const [error, setError] = useState("");
  const login = useInput("");
  const password = useInput("");

  function registerHandler() {
    if (!(login.value && password.value)) {
      return setError("Поля должны быть заполнены!");
    }
    axios
      .post("/api/auth/register", {
        login: login.value,
        password: password.value,
      })
      .then((res: AxiosResponse<any>) => {
        setError(res.data.message);
      })
      .catch((err: AxiosError) => setError(err.response?.data.message));
  }
  return (
    <div className="form">
      <h1>Register</h1>
      <TextField variant="outlined" label="Login" {...login.bind} />
      <TextField variant="outlined" label="Password" {...password.bind} />
      <Button color="success" variant="contained" onClick={registerHandler}>
        Register
      </Button>
      <Link to="/login">Login</Link>
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
