import { read, update } from "../utils/CRUD.js";
import { admin } from "../../admin_fire.js";

const startLevel = async (req, res) => {
  const { uid, level } = req.body;
  const user = await read(`/users/${uid}`);
  if (!Object.hasOwn(user.levels, level)) {
    let levels = {
      [level]: {
        level_nr: user.current_level,
        points: 0,
        hint: false,
        start_time: admin.database.ServerValue.TIMESTAMP,
        finish_time: admin.database.ServerValue.TIMESTAMP,
      },
      ...user.levels,
    };
    const updated = {
      ...user,
      levels,
    };
    try {
      await update(`users/${uid}`, updated);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(200).json({ ok: false, error });
    }
  } else {
    res.status(200).json({ ok: false, me: "nu e prima data" });
  }
};

const ghicit = async (req, res) => {
  const { uid, nume } = req.body;
  const user = await read(`/users/${uid}`);
  let ghiciti = user.ghiciti !== "" ? user.ghiciti + `, ${nume}` : nume;
  const updated = {
    ...user,
    ghiciti,
  };
  try {
    await update(`users/${uid}`, updated);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(200).json({ ok: false, error });
  }
};

export { startLevel, ghicit };
