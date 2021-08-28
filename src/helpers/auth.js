import { auth } from "../services/firebase";
import { writeData, readData } from "./db";

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
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      return true;
    })
    .catch((err) => {
      return false;
    });
}
