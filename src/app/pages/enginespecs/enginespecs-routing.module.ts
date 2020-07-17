import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnginespecsPage } from './enginespecs.page';

const routes: Routes = [
  {
    path: '',
    component: EnginespecsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnginespecsPageRoutingModule {}
