import React, { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import NavPanel from "../components/NavPanel";
import { useTypedSelector } from "./../hooks/useTypedSelector";
import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TextField, Snackbar, Alert } from "@mui/material";
import { ITasks, TaskType } from "../types/types";
import edit from "../assets/edit.png";
import success from "../assets/success.png";
import del from "../assets/delete.png";
import addtask from "../assets/addtask.png";
import { useInput } from "./../hooks/useInput";
import { useAction } from "./../hooks/useAction";
import "../styles/global.scss";
import "../styles/admin.scss";

export default function ToDo() {
  const { fetchUser } = useAction();
  const { user } = useTypedSelector((state) => state.user);
  const [editRow, setEditRow] = useState(0);
  const [type, setType] = useState(0);
  const [error, setError] = useState("");
  const taskName = useInput("");

  const handleEdit = () => {
    user.tasks[user.tasks.findIndex((t) => t.id === editRow)] = {
      ...user.tasks[editRow],
      id: editRow,
      type: type,
      name: taskName.value,
    };
    axios
      .post("/api/user/edit", user)
      .then((res: AxiosResponse<any>) => {
        fetchUser();
      })
      .catch((err: AxiosError) => setError(err.response?.data.message));
    setEditRow(0);
  };

  //event: React.ChangeEvent<HTMLSelectElement> выдает странную ошибку
  const handleChange = (event: any) => {
    setType(event.target.value);
  };

  const handleAdd = () => {
    if (user.tasks.length) {
      user.tasks.push({
        id: user.tasks[user.tasks.length - 1].id + 1,
        name: "",
        type: 1,
      });
      setEditRow(user.tasks[user.tasks.length - 1].id);
    } else {
      user.tasks.push({
        id: 1,
        name: "",
        type: 1,
      });
      setEditRow(1);
    }
  };

  const handleDelete = (id: number) => {
    user.tasks = user.tasks.filter((task) => task.id !== id);
    axios
      .post("/api/user/edit", user)
      .then((res: AxiosResponse<any>) => {
        fetchUser();
      })
      .catch((err: AxiosError) => setError(err.response?.data.message));
    setEditRow(0);
  };

  return (
    <div>
      <NavPanel />
      <div className="content">
        <div className="title">
          <h1>ToDo</h1>
          <img className="icon" onClick={handleAdd} src={addtask} alt="" />
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Task name</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.tasks.map((row: ITasks) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {editRow === row.id ? (
                      <TextField size="small" {...taskName.bind} />
                    ) : (
                      row.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow === row.id ? (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Age
                        </InputLabel>
                        <Select
                          size="small"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={TaskType.completed}>
                            Completed
                          </MenuItem>
                          <MenuItem value={TaskType.created}>Created</MenuItem>
                          <MenuItem value={TaskType.in_progress}>
                            In Progress
                          </MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      TaskType[row.type]
                    )}
                  </TableCell>
                  {editRow === row.id ? (
                    <TableCell>
                      <img
                        className="icon"
                        onClick={() => handleEdit()}
                        src={success}
                        alt=""
                      />
                    </TableCell>
                  ) : (
                    <TableCell>
                      <img
                        onClick={() => setEditRow(row.id)}
                        src={edit}
                        alt=""
                        className="icon"
                      />
                      <img
                        onClick={() => handleDelete(row.id)}
                        src={del}
                        alt=""
                        className="icon"
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
    </div>
  );
}
