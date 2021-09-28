import React from "react";
import { Link } from "react-router-dom";
import random from "../assets/Random.png";
import toDo from "../assets/ToDo.png";
import profile from "../assets/Profile.png";
import { useAuth } from "../hooks/useAuth";
import "../styles/nav.scss";
import "../styles/global.scss";

export default function NavPanel() {
  const auth = useAuth();
  return (
    <div className="nav">
      <div>
        <img src={profile} alt=" " />
        <Link className="link" to="/profile">
          Profile
        </Link>
      </div>
      <div>
        <img src={toDo} alt=" " />
        <Link className="link" to="/todo">
          ToDo
        </Link>
      </div>
      <div>
        <img src={random} alt=" " />
        <Link className="link" to="/random">
          Random Data
        </Link>
      </div>
      <div
        className="button"
        onClick={() => {
          auth.logout();
        }}
      >
        Logout
      </div>
    </div>
  );
}
