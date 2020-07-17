import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WhatsnewPageRoutingModule } from './whatsnew-routing.module';
import { WhatsnewPage } from './whatsnew.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatsnewPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WhatsnewPage]
})
export class WhatsnewPageModule {}
