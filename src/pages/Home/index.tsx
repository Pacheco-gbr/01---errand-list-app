import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputDefault, Name } from "../../components/InputDefault";
import { Message, User } from "../../config/types";
import { v4 as uuid } from "uuid";
import { Modal } from "../../components/Modal";

const rows = [
  { id: "0", description: "Test", detail: "Test" }, //0
  { id: "1", description: "Test", detail: "Test" }, //1
  { id: "2", description: "Test", detail: "Test" }, //2
  { id: "3", description: "Test", detail: "Test" }, //3
];

function Home() {
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState<User | null>(
    JSON.parse(localStorage.getItem("loginEstablished") ?? "null")
  );
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [chosenIndex, setChosenIndex] = useState(-1);
  const [openModal, setOpenModal] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);

  useEffect(() => {
    if (!userLogged) {
      navigate("/");
    }
  }, [navigate, userLogged]);

  useEffect(() => {
    localStorage.setItem("loginEstablished", JSON.stringify(userLogged));
  }, [userLogged?.messages]);

  const handleChangeTwo = (value: string, key: Name) => {
    switch (key) {
      case "description":
        setDescription(value);
        break;

      case "detail":
        setDetail(value);
        break;

      default:
    }
  };

  const handleSaveAndLogout = () => {
    const listUsers: User[] = JSON.parse(
      localStorage.getItem("listOfUsers") ?? "[]"
    );

    if (listUsers !== null) {
      const verifiedIndex = listUsers.findIndex(
        (user) => user.email == userLogged?.email
      );
      listUsers[verifiedIndex] = userLogged as User;
      localStorage.setItem("listOfUsers", JSON.stringify(listUsers));

      localStorage.removeItem("loginEstablished");

      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const handleSaveMessage = () => {
    if (description != "" && detail != "") {
      const newMessage: Message = {
        id: uuid(),
        description,
        detail,
      };
      if (userLogged) {
        setUserLogged({
          ...userLogged,
          messages: [...userLogged?.messages, newMessage],
        });
        clearInputs();
      }
    }
  };

  const handleEdit = (i: number) => {
    if (userLogged) {
      setDescription(userLogged.messages[i].description);
      setDetail(userLogged.messages[i].detail);
      setChosenIndex(i);
      setModeEdit(true);
    }
  };
  const handleSaveEdit = (i: number) => {
    if (description != "" && detail != "") {
      if (userLogged) {
        const listTemp: Message[] = [...userLogged.messages];
        const editMessage: Message = {
          id: userLogged.messages[i].id,
          description,
          detail,
        };
        listTemp[i] = editMessage;
        setUserLogged({ ...userLogged, messages: listTemp });
        setChosenIndex(-1);
        clearInputs();
        setModeEdit(false);
      }
    }
  };
  const handleDelete = (i: number) => {
    setChosenIndex(i);
    setOpenModal(true);
  };

  const clearInputs = () => {
    setDescription("");
    setDetail("");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#FFFDD9" }}>
      <Grid container flexDirection="row-reverse" spacing={5}>
        <Grid item xs={12} sm={2}>
          <Button
            onClick={handleSaveAndLogout}
            variant="contained"
            sx={{ backgroundColor: "#373626", marginTop: '0.30rem'}}
            color="error"
            size="small"
          >
            Log Out
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#FFFEF4",
            color: "#373626",
            height: "10rem",
            marginTop: "3rem",
            marginRight: "10rem",
            fontFamily: "Dancing Script",
            fontSize: "1.5rem",
            gap: "1.5rem",
            borderRadius: "0.75rem",
          }}
        >
          <h1>Welcome</h1>
          <h1>{userLogged?.name}</h1>
        </Grid>
      </Grid>
      <Grid
        container
        columnSpacing={3}
        alignItems={"center"}
        marginY={5}
        padding={2}
      >
        <Grid item xs={4}>
          <Grid>
          <InputDefault
            typeToSend="text"
            labelToSend="Description"
            nameToSend="description"
            valueToSend={description}
            colorThatShows="error"
            handleChange={handleChangeTwo}
          />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <InputDefault
            typeToSend="text"
            labelToSend="Detailing"
            nameToSend="detail"
            valueToSend={detail}
            colorThatShows="error"
            handleChange={handleChangeTwo}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#373626" }}
            size="small"
            color="success"
            onClick={() => {
              if (modeEdit !== false) {
                handleSaveEdit(chosenIndex);
              } else {
                handleSaveMessage();
              }
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{}}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      backgroundColor: "#373626",
                      color: "white",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "1rem",
                      backgroundColor: "#373626",
                      color: "white",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "1rem",
                      backgroundColor: "#373626",
                      color: "white",
                    }}
                  >
                    Detailing
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "1rem",
                      backgroundColor: "#373626",
                      color: "white",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userLogged?.messages.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "1rem" }}>
                      {row.description}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "1rem" }}>
                      {row.detail}
                    </TableCell>
                    <TableCell align="center">
                          <Button variant="contained" sx={{ margin: "0 15px", backgroundColor:"#373626" }} 
                          color="warning"
                          onClick={() => handleEdit(index)}>
                            Edit
                          </Button>
                          <Button variant="contained" sx={{ margin: "0 15px", backgroundColor:"#373626" }} color="error" 
                          onClick={() => handleDelete(index)}>
                            Delete
                          </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Modal
        index={chosenIndex}
        open={openModal}
        handleClose={handleCloseModal}
        user={userLogged as User}
        setUser={setUserLogged}
      />
    </Box>
  );
}

export { Home };
