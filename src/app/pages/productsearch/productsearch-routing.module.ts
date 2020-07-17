import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsearchPage } from './productsearch.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsearchPageRoutingModule {}
