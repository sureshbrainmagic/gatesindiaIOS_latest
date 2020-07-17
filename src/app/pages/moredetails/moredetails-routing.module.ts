import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoredetailsPage } from './moredetails.page';

const routes: Routes = [
  {
    path: '',
    component: MoredetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoredetailsPageRoutingModule {}
