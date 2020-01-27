import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/autentication.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'
import {rankingservice} from '../services/ranking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  ranking:rankingTask={
    username:'',
    puntuacionS:0,
    puntuacionG:0,
    ultimaPartida:'0',
  };

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
  ) { }
 
  ngOnInit() {
 
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
 
 
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('');
    }, err => {
      this.errorMessage = err.message;
    })
  }
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.navCtrl.navigateForward('');
        this.ranking.username=((document.getElementById("username") as HTMLInputElement).value);
        console.log(firebase.auth().currentUser.uid)
        this.rankingservice.addTodo(this.ranking,firebase.auth().currentUser.uid)
        
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })     
  }
 
}