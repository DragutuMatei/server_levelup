import { Timestamp } from "firebase-admin/firestore";
import { read, write } from "../utils/CRUD.js";
import { admin } from "../../admin_fire.js";

const checkLevel = async (req, res) => {
  const { uid, level } = req.body;
  const user = await read(`/users/${uid}`);
  if (level <= user.current_level) {
    res.status(200).json({ ok: true });
  } else {
    res.status(200).json({ ok: false, current_level: user.current_level });
  }
};

const updateLevel = async (req, res) => {
  const { resp, uid, level, cat, level_hint } = req.body;

  let decizie = false;
  const actual_level = level - 1;
  let rezolvare = process.env[`LEVEL_${actual_level}`];

  const unique_levels = [1, 11, 17];
  const special_levels = [3, 12, 24];

  if (unique_levels.includes(actual_level)) {
    rezolvare = rezolvare.split("~");
    decizie = true;
    for (let [index, c] of Object.keys(resp).entries()) {
      if (resp[c] != rezolvare[index]) {
        decizie = false;
        break;
      }
    }
  } else if (special_levels.includes(actual_level)) {
    rezolvare = rezolvare.split("~");
    if (rezolvare.includes(resp)) {
      decizie = true;
    }
  } else {
    if (resp == rezolvare) {
      decizie = true;
    }
  }

  if (!decizie) {
    res.status(200).json({ ok: false, message: "Nu e ok!" });
  }

  let punctaj = 0;
  switch (cat) {
    case "usor":
      punctaj = 6;
      break;
    case "mediu":
      punctaj = 10;
      break;
    case "greu":
      punctaj = 16;
      break;
  }

  const user = await read(`/users/${uid}`);

  let updated = {
    ...user,
    levels: {
      ...user.levels,
      [level_hint]: {
        ...user.levels[level_hint],
        finish_time:
          // !Object.hasOwn(user.levels[level_hint], "finish_time") &&
          admin.database.ServerValue.TIMESTAMP,
        points: user.levels[level_hint].hint
          ? punctaj - (punctaj / 2 + 1)
          : punctaj,
      },
    },
  };
  console.log(
    Object.hasOwn(user.levels[level_hint], "finish_time"),
    user.levels[level_hint].hint ? punctaj - (punctaj / 2 + 1) : punctaj
  );
  if (level >= user.current_level) {
    updated = {
      ...updated,
      current_level: level,
      completed_level: level - 1,
    };
  }
  console.log(updated);
  try {
    await write(`users/${uid}`, updated);
    res.status(200).json({ ok: true, message: "Este ok!" });
  } catch (error) {
    res.status(200).json({ ok: false, error });
  }
};
export { checkLevel, updateLevel };
