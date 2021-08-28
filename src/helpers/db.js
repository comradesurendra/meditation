import { db } from "../services/firebase";

export async function readData(uid) {
  return await db
    .ref("user_data")
    .orderByChild("uid")
    .equalTo(uid)
    .limitToFirst(1)
    .once("value")
    .then((snapshot) => {
      let result = snapshot.val();
      let key = Object.keys(result)[0];
      localStorage.setItem("data", JSON.stringify(result[key]));
      });
}

export async function writeData(name, check, uid) {
  return await db.ref("user_data").push({
    name: name,
    type: check === true ? "customer" : "trainer",
    uid: uid,
    status: "offline",
  });
}
