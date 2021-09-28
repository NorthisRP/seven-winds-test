import { Router } from "express";
import { Users } from "../models/User";
const jwt = require("jsonwebtoken");
const router = Router();

router.post("/login", async (req: any, res: any) => {
  try {
    const user = Users.filter(
      (user) =>
        user.pass.login === req.body.login &&
        user.pass.password === req.body.password
    )[0];
    const token = jwt.sign({ userId: user.user.id }, "mostsecretly", {
      expiresIn: "24h",
    });
    res.json({ token, userId: user.user.id });
  } catch (error) {
    res.status(500).json({ message: "Неправильный логин или пароль!" });
  }
});

router.post("/register", async (req: any, res: any) => {
  try {
    const { login, password } = req.body;

    if (Users.filter((user) => user.pass.login === login).length) {
      return res.json({ message: "Такой логин уже существует!" });
    }
    Users.push({
      pass: { login, password },
      user: { id: Users.length, name: "", lastname: "", about: "", tasks: [] },
    });
    res.json({ message: "Пользователь успешно создан!" });
  } catch (error) {
    res.status(404).json({ message: `Что-то пошло не так: ${error}` });
  }
});

module.exports = router;
