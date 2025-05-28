import express, { json } from "express";
import {
  CORECT,
  MISSION_START,
  USER_UPGRADE,
  SYNC_STATS,
  PROGRESS_CHECKPOINT,
  SESSION_INIT,
  CONFIG_APPLY,
  INVENTORY_UPDATE,
  PLAYER_TAG,
  SKILLS_UPGRADE,
  QUEST_LOG,
  MAP_REVEAL,
  ENEMY_ALERT,
  ACHIEVEMENT_UNLOCK,
  WORLD_WEATHER,
  SETTINGS_AUDIO,
  PLAYER_TELEPORT,
  BATTLE_REPORT,
  PET_COMMAND,
  TRADE_OFFER,
  PUZZLE_SOLVE,
} from "../images.js";
import { read, update, write } from "./utils/CRUD.js";
import { checkLevel, updateLevel } from "./security/levelcheck.js";
import { getUserInfo } from "./security/auth/login.js";
import { startLevel } from "./pointing/points.js";
import { useHint } from "./pointing/hints.js";
import { Timestamp } from "firebase-admin/firestore";
import { admin } from "../admin_fire.js";

const app = express();

app.use(json());

app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Origin", "https://osfiir.ro");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

const random = (str) => {
  const length = str.length;
  const partsCount = 5;
  const partSize = Math.floor(length / partsCount);
  const parts = [];

  // Împarte în bucăți egale (ultima poate fi mai lungă)
  for (let i = 0; i < partsCount - 1; i++) {
    parts.push(str.slice(i * partSize, (i + 1) * partSize));
  }
  parts.push(str.slice((partsCount - 1) * partSize)); // ultima bucată

  // Amestecă aleatoriu bucățile
  for (let i = parts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [parts[i], parts[j]] = [parts[j], parts[i]];
  }

  return parts;
};

app.post("/settings/update", (req, res) => {
  res.status(200).json({
    message: "acesta este API call-ul corect!",
    code: random(CORECT),
  });
});

app.post("/api/mission/start", (req, res) => {
  res.json({
    message: "nici asta nu e buna",
    code: random(MISSION_START),
  });
});

app.post("/user/upgrade", (req, res) => {
  res.json({
    message: "nu merge upgrade-ul",
    code: random(USER_UPGRADE),
  });
});

app.post("/sync/stats", (req, res) => {
  res.json({
    message: "false",
    code: random(SYNC_STATS),
  });
});

app.post("/progress/checkpoint", (req, res) => {
  res.json({
    message: "checkpoint ratat",
    code: random(PROGRESS_CHECKPOINT),
  });
});

app.post("/session/init", (req, res) => {
  res.json({
    message: "nu s-a putut porni sesiunea",
    code: random(SESSION_INIT),
  });
});

app.post("/config/apply", (req, res) => {
  res.json({
    message: "config invalid",
    code: random(CONFIG_APPLY),
  });
});

app.post("/inventory/update", (req, res) => {
  res.json({
    message: "nu se poate actualiza inventarul",
    code: random(INVENTORY_UPDATE),
  });
});

app.post("/player/tag", (req, res) => {
  res.json({
    message: "tag respins",
    code: random(PLAYER_TAG),
  });
});

app.post("/skills/upgrade", (req, res) => {
  res.json({
    message: "skill nerecunoscut",
    code: random(SKILLS_UPGRADE),
  });
});

app.post("/quest/log", (req, res) => {
  res.json({
    message: "quest invalid",
    code: random(QUEST_LOG),
  });
});

app.post("/map/reveal", (req, res) => {
  res.json({
    message: "zona necunoscută",
    code: random(MAP_REVEAL),
  });
});

app.post("/enemy/alert", (req, res) => {
  res.json({
    message: "alerta eșuată",
    code: random(ENEMY_ALERT),
  });
});

app.post("/achievement/unlock", (req, res) => {
  res.json({
    message: "nu ai deblocat nimic",
    code: random(ACHIEVEMENT_UNLOCK),
  });
});

app.post("/world/weather", (req, res) => {
  res.json({
    message: "vremea nu s-a schimbat",
    code: random(WORLD_WEATHER),
  });
});

app.post("/settings/audio", (req, res) => {
  res.json({
    message: "setări audio invalide",
    code: random(SETTINGS_AUDIO),
  });
});

app.post("/player/teleport", (req, res) => {
  res.json({
    message: "teleportare eșuată",
    code: random(PLAYER_TELEPORT),
  });
});

app.post("/battle/report", (req, res) => {
  res.json({
    message: "raport respins",
    code: random(BATTLE_REPORT),
  });
});

app.post("/pet/command", (req, res) => {
  res.json({
    message: "comandă ignorată de animal",
    code: random(PET_COMMAND),
  });
});

app.post("/trade/offer", (req, res) => {
  res.json({
    message: "ofertă refuzată",
    code: random(TRADE_OFFER),
  });
});

app.post("/puzzle/solve", (req, res) => {
  res.json({
    message: "rezolvare greșită",
    code: random(PUZZLE_SOLVE),
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server!",
  });
});

function setCustomHeaders(res, data) {
  res.setHeader("Payment-info", "Total cart");
  res.setHeader("Payment-amount", "4314");
}

app.get("/api/getdata", (req, res) => {
  const data = {
    info: "infoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfo",
  };
  setCustomHeaders(res, data);
  res.status(200).json({ message: "nothing important here" });
});

app.post("/updateUserLevel", async (req, res) => {
  const { user, cur_level, compl_level } = req.body;
  const exist = await read(`/users/${user.uid}`);
  if (!exist)
    await write(`/users/${user.uid}`, {
      current_level: cur_level,
      completed_level: compl_level,
      email: user.email,
      name: user.displayName,
      qr_scanned: false,
      points: 0,
      levels: {
        created_at: admin.database.ServerValue.TIMESTAMP
        /*
        level_1: {
          points:5,
          hint:true/false
          start_time:timestamp,
          finish_time:timestamp
        }
        */
      },
      /*
        level_nr:1,
        points:5,
        hint:true/false
        start_time:timestamp,
        finish_time:timestamp
        */
    });
  res.status(200).json({ user });
});

app.get("/getUserInfo/:uid", getUserInfo);

app.post("/startLevel", startLevel);
app.post("/checkLevel", checkLevel);
app.post("/updateLevel", updateLevel);

app.post("/useHint", useHint);

app.post("/test", (req, res) => {
  const { uid } = req.body;
  console.log("test", uid);
  update(`/users/${uid}`, { qr_scanned: true });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
