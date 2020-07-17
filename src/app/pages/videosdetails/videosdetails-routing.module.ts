import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosdetailsPage } from './videosdetails.page';

const routes: Routes = [
  {
    path: '',
    component: VideosdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosdetailsPageRoutingModule {}
