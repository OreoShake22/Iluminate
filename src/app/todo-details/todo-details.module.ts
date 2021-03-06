import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoDetailsPageRoutingModule } from './todo-details-routing.module';

import { todoDetailsPage } from './todo-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoDetailsPageRoutingModule
  ],
  declarations: [todoDetailsPage]
})
export class TodoDetailsPageModule {}
