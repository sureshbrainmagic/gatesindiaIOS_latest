import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchoegatescrossrefPage } from './searchoegatescrossref.page';

const routes: Routes = [
  {
    path: '',
    component: SearchoegatescrossrefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchoegatescrossrefPageRoutingModule {}
