import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherlinksPage } from './otherlinks.page';

const routes: Routes = [
  {
    path: '',
    component: OtherlinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherlinksPageRoutingModule {}
