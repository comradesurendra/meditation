import {auth} from "../services/firebase"

export async function signup(email, password) {
  return await auth().createUserWithEmailAndPassword(email, password)
}

export async function signin(email, password) {
  return await auth().signInWithEmailAndPassword(email, password)
}


export async function logout() {
  return await auth().signOut()
}