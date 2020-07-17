import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnginecodePage } from './enginecode.page';

const routes: Routes = [
  {
    path: '',
    component: EnginecodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnginecodePageRoutingModule {}
