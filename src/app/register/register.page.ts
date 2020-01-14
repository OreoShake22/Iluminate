
	
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/autentication.service';
import { NavController } from '@ionic/angular';
import { rankingTask } from "../models/rankingTask.interface";
import * as firebase from 'firebase'
import {rankingservice} from '../services/ranking.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ranking:rankingTask={
    id:'',
    username:'',
    puntuacionS:0,
    puntuacionG:0,
  };
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private rankingservice:rankingservice
  ) {}
 
  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.navCtrl.navigateForward('');
       this.ranking.id=firebase.auth().currentUser.uid;
        this.ranking.username=((document.getElementById("username") as HTMLInputElement).value);
        this.rankingservice.addTodo(this.ranking)
        
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })     
  }
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }
 
 
}
 