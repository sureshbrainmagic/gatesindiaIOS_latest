import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchemespromotionPage } from './schemespromotion.page';

const routes: Routes = [
  {
    path: '',
    component: SchemespromotionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchemespromotionPageRoutingModule {}
