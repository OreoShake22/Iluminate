import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/autentication.service';
import { rankingTask } from "../models/model.interface";
import * as firebase from 'firebase'
import {rankingservice} from '../services/ranking.service';
import { Url } from 'url';

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
    lastWeek:0,
    grupos:[]
  };
  captureDataUrl:Url
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
      this.errorMessage = "";
      this.navCtrl.navigateForward('');
    }, err => {
      this.errorMessage = err.message;
    })
  }
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       this.navCtrl.navigateForward('');
        this.ranking.username=((document.getElementById("username") as HTMLInputElement).value);
        this.rankingservice.addTodo(this.ranking,firebase.auth().currentUser.uid)
        this.upload() 
        
     }, err => {
       this.errorMessage = err.message;
       this.successMessage = "";
     })     
  }
 
  getImage() {
   

    console.log(this.captureDataUrl)


  }

  upload() {
var op1="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAC6klEQVRoge3ZTYsUVxTG8d84vsxoFGEyiYqEKOlZmTF+BIWAUTcSXGSv5AO4CLgTxYjMWlScTdxkld24EXWyiG6EGAIhuIhhBA2KkuiM2r4vqkp7yu7U7apbPS34wAPdXfee+z9d1ee+9IB4WoWd2IbN+BSr02v/4m9cxQVM4UHEsStpDJOYw8tAz+E0GgvA+1rDmMBT4eB5P8ExDPWYXQO/VwDP+zLW9gp+C25HhM98A+N1wzdqgm9NYk1d8EOSKlIXfOYrkt9XdE30AD7zwdjwY6pVm279QORHabKH8JmPx4JfpbtJKpZnsbIIblFAAjuxPKBdbK3AjqJGIQlsq85SWoVjhySwOQJIWRVObCEJbIgAUlYbixoMBARpYml1llJqKljohdyBvlZIAvdrp+is/4oahCRwPQJIWf1V1CAkgasRQMrqt6IGIQlciABSVueLGoRUoZX4x/zZ+Cf8WBKqk77B7pb3c5IF3WyM4KfNX6fcxUcxAqf6GPdyY5yKGF9DsgFvHeAcBiPEHpQ8Kq2xmwImsW51zNsrxh9US2IQZ9rE/b4SaQcNSU4P8oNNYaREvA9xtk28X7AsAm9brZVsvPOD3sReLA6IsRj70j75ODNq3NRnGtc+iSyRCezCJ5LN+XD6eld67VaHvjP4vG74TKP4uQNIGV/Sg28+r2WS04PZCuBNHFHjMx+iNZINeDeJzOKkCKUyZCYO1QeS/fNWfCHZCLUer1/Hr7goqT5RZtj3epfVwJIIcZbo4R8d63AY17yp3fslZbVbjaZ9Z9JY13BITf8TjEiqRlP7qvIM0ziAr7De/M34UPrZjrTNdNqnXazHOKHc8qSt9uBOh8GK/Ch1mb638XUV8AF8h+clAWL4BY4qWe6PLCB43oe7hf+2D6Dz3hsKP4aHfQCc90N8VgQ/IKkQCw3byYUnJNv7ALLIX/5fAjHX+D2/C+N9ABfqTRl068ncnk6Z9aHasv5h4b/ZUP+ZQb8C3aUVNYdwaggAAAAASUVORK5CYII="

    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = firebase.auth().currentUser.uid;
    var img='data:image/jpeg;base64,'+'/aaa.jpg'
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    console.log(storageRef)
    console.log(filename)
    console.log(imageRef)
    imageRef.putString(op1,firebase.storage.StringFormat.DATA_URL)
      .then((snapshot) => {
        // Do something here when the data is succesfully uploaded!
        console.log(img)
      });
  }
}