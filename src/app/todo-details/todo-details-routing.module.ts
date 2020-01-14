import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { todoDetailsPage } from './todo-details.page';

const routes: Routes = [
  {
    path: '',
    component: todoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoDetailsPageRoutingModule {}
