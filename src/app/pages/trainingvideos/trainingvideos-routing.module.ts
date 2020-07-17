import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingvideosPage } from './trainingvideos.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingvideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingvideosPageRoutingModule {}
