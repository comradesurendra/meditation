import { db, timestp } from "../services/firebase";

//**** Featch the user data and store into localStorage******//
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

//**** Update the record in firebase for new registered user ****//
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

//**** Update the status inside db based on user loing and logout ****//
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

//***** Use the server time for the timer and update the paired trainer id *****//
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


//****** Update the pair customer id into the db *****//
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

//***** Update the timer value based on the trainer exit ****//
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
