import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchoegatescrossrefPageRoutingModule } from './searchoegatescrossref-routing.module';
import { SearchoegatescrossrefPage } from './searchoegatescrossref.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchoegatescrossrefPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchoegatescrossrefPage]
})
export class SearchoegatescrossrefPageModule {}
