import React, { useEffect, useState } from "react";
import NavPanel from "./../components/NavPanel";
import axios from "axios";
import "../styles/global.scss";
import "../styles/admin.scss";

export default function RandomData() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum")
      .then((res) => setData(res.data.very_long_sentence));
  }, []);

  return (
    <div>
      <NavPanel />
      <div className="content">
        <h1>Random fact</h1>
        <p>{data}</p>
      </div>
    </div>
  );
}
