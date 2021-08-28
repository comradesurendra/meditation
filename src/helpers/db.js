import { db } from "../services/firebase";

export async function readData(uid) {
  let snapshot = await db
    .ref("user_data")
    .orderByChild("uid")
    .equalTo(uid)
    .limitToFirst(1)
    .once("value")
    .then((snapshot) => snapshot.val());
    let key = Object.keys(snapshot)[0];
    return snapshot[key];
}

export async function writeData(name, check, uid) {
  return await db.ref("user_data").push({
    name: name,
    type: check === true ? "customer" : "trainer",
    uid: uid,
    status: "offline",
  });
}
