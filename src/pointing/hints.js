import { read, update } from "../utils/CRUD.js";

const useHint = async (req, res) => {
  const { uid, level } = req.body;
  const user = await read(`/users/${uid}`);
  let levels = user.levels;
  levels[level].hint = true;

  const hint = await read(`/hints/${level}`);
  if (!hint) {
    return res.status(200).json({ ok: false, message: "Hint not found" });
  }
  await update(`/users/${uid}`, {
    ...user,
    levels,
  });
  res.status(200).json({ ok: true, hint: hint });
};

export { useHint };
