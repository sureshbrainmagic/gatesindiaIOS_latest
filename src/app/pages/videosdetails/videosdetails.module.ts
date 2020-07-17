import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VideosdetailsPageRoutingModule } from './videosdetails-routing.module';
import { VideosdetailsPage } from './videosdetails.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VideosdetailsPageRoutingModule
  ],
  declarations: [VideosdetailsPage]
})
export class VideosdetailsPageModule {}
