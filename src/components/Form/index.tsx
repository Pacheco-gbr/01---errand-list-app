import { Stack, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { InputDefault, Name } from "../InputDefault";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { findingAllUsers, getUsers, postUser } from "../../store/modules/users/usersSlice";

interface FormProps {
  mode: "login" | "signup";
}

function Form({ mode }: FormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const usersRedux = useAppSelector(findingAllUsers);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    if (name.length < 3) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (mode === "signup") {
      if (
        !password ||
        !repassword ||
        password.length < 6 ||
        password !== repassword
      ) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
    }

    if (mode === "login") {
      if (!password) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
    }
  }, [name, email, password, repassword, mode]);

  const changingInput = (value: string, key: Name) => {
    switch (key) {
      case "name":
        setName(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      case "repassword":
        setRepassword(value);
        break;

      default:
    }
  };

  const changingPage = () => {
    if (mode === "login") {
      navigate("/signup");
    } else {
      navigate("/");
    }
  };

  const createAccount = () => {
    const newUser = {
      name,
      email,
      password,
      errands: [],
    };

    const userExist = usersRedux.some((user) => user.email === newUser.email);

    if (!userExist) {
      dispatch(postUser(newUser))
      clearInputs();
      alert("User settled!");

      setTimeout(() => {
        changingPage();
      }, 500);
    } else {
      alert("This email has been registered before.");
    }
  };

  const login = () => {
    const userExist = usersRedux.find((user) => user.email === email && user.password === password);

    if (!userExist) {
      const userConfirming = window.confirm(
        "This data has not been found. Do you want to create another account?"
      );

      if (userConfirming) {
        navigate("/signup");
      }
    } else {
      localStorage.setItem("loginEstablished", JSON.stringify(userExist.id));

      alert("Successful login! You will be in your Home in seconds...");
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRepassword("");
  };

  return (
    <>
      <Stack spacing={2}>
        {mode === "signup" && (
          <>
            <InputDefault
              typeToSend="text"
              labelToSend="Name"
              nameToSend="name"
              valueToSend={name}
              handleChange={changingInput}
              colorThatShows={errorName ? "error" : "success"}
            />
            <InputDefault
              typeToSend="email"
              labelToSend="E-mail"
              nameToSend="email"
              valueToSend={email}
              handleChange={changingInput}
              colorThatShows={errorEmail ? "error" : "success"}
            />
            <InputDefault
              typeToSend="password"
              labelToSend="Password"
              nameToSend="password"
              valueToSend={password}
              handleChange={changingInput}
              colorThatShows={errorPassword ? "error" : "success"}
            />
            <InputDefault
              typeToSend="password"
              labelToSend="Rewrite your password."
              nameToSend="repassword"
              valueToSend={repassword}
              handleChange={changingInput}
              colorThatShows={errorPassword ? "error" : "success"}
            />
            <Button
              onClick={createAccount}
              disabled={errorName || errorEmail || errorPassword}
              variant="contained"
              color="warning"
            >
              CREATE ACCOUNT
            </Button>
          </>
        )}

        {mode === "login" && (
          <>
            <InputDefault
              typeToSend="email"
              labelToSend="E-mail"
              nameToSend="email"
              valueToSend={email}
              handleChange={changingInput}
              colorThatShows={errorEmail ? "error" : "success"}
            />
            <InputDefault
              typeToSend="password"
              labelToSend="Password"
              nameToSend="password"
              valueToSend={password}
              handleChange={changingInput}
              colorThatShows={errorPassword ? "error" : "success"}
            />
            <Button variant="contained" color="warning" onClick={login}>
              LOGIN
            </Button>
          </>
        )}
      </Stack>

      <Box>
        {mode === "login" && (
          <Typography>
            Do not have an account?{" "}
            <Typography
              variant="caption"
              color="darkblue"
              onClick={changingPage}
              sx={{ cursor: "pointer", marginLeft: "0.01rem" }}
            >
              Register
            </Typography>
          </Typography>
        )}
        {mode === "signup" && (
          <Typography>
            Already have an account?
            <Typography
              variant="caption"
              color="darkblue"
              onClick={changingPage}
              sx={{ cursor: "pointer", marginLeft: "0.25rem" }}
            >
              Click here to go back.
            </Typography>
          </Typography>
        )}
      </Box>
    </>
  );
}

export { Form };
