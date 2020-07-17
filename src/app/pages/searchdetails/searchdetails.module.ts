import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchdetailsPageRoutingModule } from './searchdetails-routing.module';
import { SearchdetailsPage } from './searchdetails.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchdetailsPageRoutingModule,
    ComponentsModule,
    MatExpansionModule
  ],
  declarations: [SearchdetailsPage]
})
export class SearchdetailsPageModule {}
