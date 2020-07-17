import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsearchPageRoutingModule } from './productsearch-routing.module';
import { ProductsearchPage } from './productsearch.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsearchPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductsearchPage]
})
export class ProductsearchPageModule {}
