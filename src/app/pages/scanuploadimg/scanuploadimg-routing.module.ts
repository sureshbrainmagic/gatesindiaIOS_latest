import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanuploadimgPage } from './scanuploadimg.page';

const routes: Routes = [
  {
    path: '',
    component: ScanuploadimgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanuploadimgPageRoutingModule {}
