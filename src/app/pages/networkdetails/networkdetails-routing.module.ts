import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetworkdetailsPage } from './networkdetails.page';

const routes: Routes = [
  {
    path: '',
    component: NetworkdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkdetailsPageRoutingModule {}
