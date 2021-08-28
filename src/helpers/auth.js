import {auth} from "../services/firebase"
import {writeData,readData} from "./db"

export async function signup(email, password,name,check) {
  try{
    let response =  await auth().createUserWithEmailAndPassword(email, password);
    if(response){
      await writeData(name,check,response.user.uid)
      return true;
    }
  } catch(e){
    return false;
  }
}

export async function signin(email, password) {
  try{
    let response = await auth().signInWithEmailAndPassword(email, password);
    localStorage.setItem("token", response.user.refreshToken);
    localStorage.setItem("uid", response.user.uid);
    let userData = await readData(response.user.uid);
    return userData;
  } catch(e){
    return false;
  } 
}


export async function logout() {
  return await auth().signOut().then(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    return true;
      })
      .catch((err) => {
          return false;
      });
}