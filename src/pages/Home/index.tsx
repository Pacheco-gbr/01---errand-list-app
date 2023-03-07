import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputDefault, Name } from "../../components/InputDefault";
import { Modal } from "../../components/Modal";
import { User } from "../../store/modules/typeStore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  attErrand,
  findingAllErrands,
  getErrands,
  saveErrand,
} from "../../store/modules/errands/errandsSlice";

function Home() {
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState<User | null>(
    JSON.parse(localStorage.getItem("loginEstablished") ?? "null")
  );
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const [showFiledErrands, setShowFiledErrands] = useState(false);
  const [idErrand, setIdErrand] = useState("");

  const dispatch = useAppDispatch();
  const listErrands = useAppSelector(findingAllErrands);
  

  const clearInputs = () => {
    setDescription("");
    setDetail("");
    setIdErrand("");
  };

  const getIdFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem("loginEstablished") || "");
  };

  useEffect(() => {
    dispatch(getErrands(getIdFromLocalstorage()));
  }, [dispatch]);

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
        (user) => user.email === userLogged?.email
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
    if (description !== "" && detail !== "") {
      dispatch(
        saveErrand({
          idUser: getIdFromLocalstorage(),
          dataCreateErrand: { description, detail },
        })
      );
      clearInputs();
    }
  };

  const handleFile= (idErrand: string, filed: boolean) => {
    dispatch(attErrand({
      idUser: getIdFromLocalstorage(),
      idErrand: idErrand,
      dataUpdateErrand: { filed: !filed }
    }))
  };
  
  const handleSaveEdit = (idErrand: string) => {
    console.log(idErrand);
    if (description !== "" && detail !== "") {
      console.log(idErrand);
      dispatch(
        attErrand({
          idUser: getIdFromLocalstorage(),
          idErrand: idErrand,
          dataUpdateErrand: { description, detail },
        })
      );
      clearInputs();
    }
  };

  const handleEdit = (id: string) => {
    setModeEdit(true);
    const indexOfErrand = listErrands.findIndex((errand) => errand.id === id);
    setDescription(listErrands[indexOfErrand].description);
    setDetail(listErrands[indexOfErrand].detail);
    setIdErrand(id);
  };

  const handleDelete = (id: string) => {
    setIdErrand(id);
    setOpenModal(true);
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
            sx={{ backgroundColor: "#373626", marginTop: "0.30rem" }}
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
                handleSaveEdit(idErrand);
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
        <Grid item>
          <Button
            variant="contained"
            color="error"
            onClick={() => setShowFiledErrands(!showFiledErrands)}
          >
            {showFiledErrands ? "Unfiled errands" : "Filed errands"}
          </Button>
        </Grid>
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
                {listErrands?.map((row, index) => {
                  if (row.filed === showFiledErrands) {
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                          <Button
                            variant="contained"
                            sx={{
                              margin: "0 15px",
                              backgroundColor: "#373626",
                            }}
                            color="warning"
                            onClick={() => handleFile(row.id, row.filed)}
                          >
                            File
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              margin: "0 15px",
                              backgroundColor: "#373626",
                            }}
                            color="warning"
                            onClick={() => handleEdit(row.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              margin: "0 15px",
                              backgroundColor: "#373626",
                            }}
                            color="error"
                            onClick={() => handleDelete(row.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return true;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Modal
        idErrand={idErrand}
        idUser={getIdFromLocalstorage()}
        open={openModal}
        handleClose={handleCloseModal}
      />
    </Box>
  );
}

export { Home };
