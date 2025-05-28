import { auth } from "../../../fire_config.js"; // Adjust the path
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"; // Import auth methods
import { read } from "../../utils/CRUD.js";

const getUserInfo = async (req, res) => {
  const { uid } = req.params;
  console.log("uid", uid);
  const user = await read(`/users/${uid}`);
  res.status(200).json({ user });
};

export { getUserInfo };
