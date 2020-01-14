import { Component } from '@angular/core';
import { AuthenticateService } from '../services/autentication.service';

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
}
