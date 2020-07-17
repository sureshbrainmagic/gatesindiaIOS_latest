import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductdetailsPageRoutingModule } from './productdetails-routing.module';
import { ProductdetailsPage } from './productdetails.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProductdetailsPageRoutingModule
  ],
  declarations: [ProductdetailsPage]
})
export class ProductdetailsPageModule {}
