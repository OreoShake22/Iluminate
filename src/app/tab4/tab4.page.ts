import { Component } from '@angular/core';
import { AuthenticateService } from '../services/autentication.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(
    private authService: AuthenticateService,
  ) {}


  logOut(value){
    this.authService.logoutUser()
  }
  
  change()
  {
    var auth = firebase.auth();
    var emailAddress = firebase.auth().currentUser.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
     alert('Mezua bidali da '+ emailAddress + ' mailera' )
    }).catch(function(error) {
      // An error happened.
    });
  }
  
}
