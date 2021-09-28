import { Router } from "express";
import { Users } from "../models/User";
const router = Router();

router.get("/get", async (req: any, res: any) => {
  try {
    const user = Users.filter(
      (user) => user.user.id === Number(req.query.userId)
    )[0];
    res.send(user.user);
  } catch (error) {
    res.status(500).json({ message: "Эта ошибка не должна была произойти" });
  }
});

router.post("/edit", async (req: any, res: any) => {
  try {
    const reqUser = { ...req.body };
    Users[reqUser.id].user = { ...Users[reqUser.id].user, ...reqUser };
    res.send({ message: "Данные успешно изменены!" });
  } catch (error) {
    res.status(500).json({ message: "Эта ошибка не должна была произойти" });
  }
});

module.exports = router;
