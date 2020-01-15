
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
<<<<<<< HEAD
import * as admin from 'firebase-admin';
=======
import { rankingTask } from "../models/model.interface";
>>>>>>> f1f4022adf8fa5ee7275bf8d61392253778b0076
 
@Injectable()
export class AuthenticateService {
  ranking:rankingTask={
    id:'',
    username:'',
    puntuacionS:0,
    puntuacionG:0,
  };
  constructor(){}
 
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
       
   })
   
  }
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }

<<<<<<< HEAD
  
}

=======
}
>>>>>>> f1f4022adf8fa5ee7275bf8d61392253778b0076
