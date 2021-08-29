import { db, timestp } from "../services/firebase";

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
      localStorage.setItem("userId", key);
      localStorage.setItem("data", JSON.stringify(result[key]));
    });
}

export async function writeData(name, check, uid) {
  return await db.ref("user_data").push({
    name: name,
    type: check === false ? "customer" : "trainer",
    uid: uid,
    status: "offline",
    occupied: false,
    countdown: "",
    pair: "",
  });
}

export async function updateStatus(uid, check) {
  if (check == "login") {
    return await db
      .ref("user_data")
      .orderByChild("uid")
      .equalTo(uid)
      .once("child_added", function (snapshot) {
        snapshot.ref.update({ status: "online", occupied: false, pair: "" });
      });
  } else {
    return await db
      .ref("user_data")
      .orderByChild("uid")
      .equalTo(uid)
      .once("child_added", function (snapshot) {
        snapshot.ref.update({ status: "offline", occupied: false, pair: "" });
      });
  }
}

export async function setCounter(uid, tid) {
  return await db.ref(`user_data/${uid}`).update({
    countdown: {
      startAt: timestp,
      seconds: 60,
    },
    occupied: true,
    pair: tid,
  });
}

export async function connectTrainer(uid, tid) {
  return await db.ref(`user_data/${tid}`).update({
    countdown: {
      startAt: timestp,
      seconds: 60,
    },
    occupied: true,
    pair: uid,
  });
}

export async function endCall(uid) {
  return await db.ref(`user_data/${uid}`).update({
    countdown: {
      startAt: timestp,
      seconds: 0,
    },
    occupied: false,
    pair: "",
  });
}
