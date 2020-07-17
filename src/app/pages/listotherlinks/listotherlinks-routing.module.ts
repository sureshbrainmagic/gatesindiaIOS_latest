import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListotherlinksPage } from './listotherlinks.page';

const routes: Routes = [
  {
    path: '',
    component: ListotherlinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListotherlinksPageRoutingModule {}
