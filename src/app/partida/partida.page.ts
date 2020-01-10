import { Component, OnInit, ViewChild } from '@angular/core';
import {NavController} from '@ionic/angular';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

    @ViewChild('slides', { static: true }) slides: any;
    slideOptions: any;
    flashCardFlipped: boolean = false;

  constructor(public navCtrl: NavController, public dataService: DataService) { }

  ngOnInit() {
  }

  ionViewDidLoad() {

  }

  selectAnswer(){
      this.flashCardFlipped = true;
  }

}
