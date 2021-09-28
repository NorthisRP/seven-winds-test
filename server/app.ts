import express from "express";
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
