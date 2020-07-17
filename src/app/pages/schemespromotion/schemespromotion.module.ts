import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SchemespromotionPageRoutingModule } from './schemespromotion-routing.module';
import { SchemespromotionPage } from './schemespromotion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SchemespromotionPageRoutingModule
  ],
  declarations: [SchemespromotionPage]
})
export class SchemespromotionPageModule {}
