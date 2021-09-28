import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useAction } from "../hooks/useAction";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import edit from "../assets/edit.png";
import save from "../assets/save.png";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useInput } from "./../hooks/useInput";
import EditableField from "../components/EditableField";
import NavPanel from "../components/NavPanel";
import "../styles/admin.scss";
import "../styles/global.scss";

const Profile: React.FC = () => {
  const { user, error, loading } = useTypedSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const { fetchUser, fetchError } = useAction();
  const name = useInput(user.name);
  const lastName = useInput(user.lastname);
  const about = useInput(user.about);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1>Загружаем пользователя...</h1>;
  }

  const editHandler = () => {
    axios
      .post("/api/user/edit", {
        name: name.value,
        lastname: lastName.value,
        about: about.value,
        id: user.id,
      })
      .then((res: AxiosResponse<any>) => {
        setEditMode(false);
        fetchUser();
      })
      .catch((err: AxiosError) => fetchError(err.response?.data.message));
  };

  return (
    <div>
      <NavPanel />
      <div className="content">
        <div className="title">
          <h1>Profile</h1>
          {editMode ? (
            <img className="icon" onClick={editHandler} src={save} alt="" />
          ) : (
            <img
              className="icon"
              onClick={() => setEditMode(true)}
              src={edit}
              alt=""
            />
          )}
        </div>
        <div className="fields">
          <EditableField
            editMode={editMode}
            title={"Name"}
            text={user.name}
            bind={name.bind}
          />
          <EditableField
            editMode={editMode}
            title={"LastName"}
            text={user.lastname}
            bind={lastName.bind}
          />
          <EditableField
            editMode={editMode}
            title={"About"}
            text={user.about}
            bind={about.bind}
          />
        </div>
        <Snackbar
          open={!!error}
          autoHideDuration={1400}
          onClose={() => fetchError("")}
        >
          <Alert variant="filled" severity="success">
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Profile;
