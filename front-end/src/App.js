import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

function App() {
  const [state, setState] = useState({
    name: "",
    address: "",
    id: "",
  });
  const [data, setData] = useState([]);

  const getAllData = async () => {
    await axios
      .get("http://localhost:3000/dev/todos")
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  };
 
  useEffect(() => {
    getAllData();
  }, []);

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();

    const temp = {
      name: state.name,
      address: state.address,
    };
    if (state.id) {
      axios
        .put(`http://localhost:3000/dev/todos/${state.id}`, temp)
        .then(() => getAllData())
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3000/dev/todos", temp)
        .then(() => getAllData())
        .catch((err) => console.log(err));
    }

    setState({
      name: "",
      address: "",
      id: "",
    });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleEdit = (row) => (e) => {
    e.stopPropagation();
    setState({ id: row._id, name: row.name, address: row.address });
  };
  const handleDelete = (row) => (e) => {
    e.stopPropagation();
    console.log(row);
    axios
      .delete(`http://localhost:3000/dev/todos/${row._id}`)
      .then(() => getAllData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          paddingTop: "50px",
        }}
      >
        <Box
          sx={{
            margin: "10px 0px",
          }}
        >
          <form method="post" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <TextField
                  required
                  name="name"
                  id="outlined-required"
                  label="Name"
                  value={state.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  required
                  name="address"
                  id="outlined-required"
                  label="Address"
                  value={state.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={4}>
                <Button type="submit" variant="contained">
                  {state.id ? "Update" : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Typography variant="h5" component="h2">
          All Users
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
            <TableBody>
              {data.length === 0
                ? "data not found"
                : data?.map((row) => {
                    return (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>
                          <Button
                            type="submit"
                            variant="outlined"
                            size="medium"
                            onClick={handleEdit(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="submit"
                            variant="outlined"
                            color="error"
                            onClick={handleDelete(row)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default App;
