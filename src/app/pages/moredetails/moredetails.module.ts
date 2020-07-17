import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MoredetailsPageRoutingModule } from './moredetails-routing.module';
import { MoredetailsPage } from './moredetails.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MoredetailsPageRoutingModule,
    MatExpansionModule
  ],
  exports: [
    MatExpansionModule,
  ],
  declarations: [MoredetailsPage]
})
export class MoredetailsPageModule {}
