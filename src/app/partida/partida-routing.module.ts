import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartidaPage } from './partida.page';

const routes: Routes = [
  {
    path: '',
    component: PartidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidaPageRoutingModule {}
