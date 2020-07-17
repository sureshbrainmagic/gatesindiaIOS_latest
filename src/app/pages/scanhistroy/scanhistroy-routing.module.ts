import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanhistroyPage } from './scanhistroy.page';

const routes: Routes = [
  {
    path: '',
    component: ScanhistroyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanhistroyPageRoutingModule {}
