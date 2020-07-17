import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MakePageRoutingModule } from './make-routing.module';
import { MakePage } from './make.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakePageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    MakePage,
  ]
})
export class MakePageModule { }
