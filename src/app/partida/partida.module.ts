import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartidaPageRoutingModule } from './partida-routing.module';

import { PartidaPage } from './partida.page';
import { FlashCardComponent } from '../flash-card/flash-card.component';
import { DataService } from '../data/data.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartidaPageRoutingModule
  ],
  declarations: [PartidaPage,FlashCardComponent],
  providers: [
    DataService
  ]
})
export class PartidaPageModule {}
