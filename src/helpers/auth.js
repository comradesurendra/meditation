import { auth } from "../services/firebase";
import { writeData, readData, updateStatus } from "./db";

export async function signup(email, password, name, check) {
  try {
    let response = await auth().createUserWithEmailAndPassword(email, password);
    if (response) {
      localStorage.setItem("token", response.user.refreshToken);
      localStorage.setItem("uid", response.user.uid);
      await writeData(name, check, response.user.uid);
      return true;
    }
  } catch (e) {
    return false;
  }
}

export async function signin(email, password) {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    if (response) {
      localStorage.setItem("token", response.user.refreshToken);
      localStorage.setItem("uid", response.user.uid);
      readData(response.user.uid);
      updateStatus(response.user.uid, "login");
      return true;
    }
  } catch (e) {
    return false;
  }
}

export async function logout() {
  return await auth()
    .signOut()
    .then(() => {
      updateStatus(localStorage.getItem('uid'), "logout");
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("data");
      return true;
    })
    .catch((err) => {
      return false;
    });
}
