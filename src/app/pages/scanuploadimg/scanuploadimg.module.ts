import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanuploadimgPageRoutingModule } from './scanuploadimg-routing.module';

import { ScanuploadimgPage } from './scanuploadimg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanuploadimgPageRoutingModule
  ],
  declarations: [ScanuploadimgPage]
})
export class ScanuploadimgPageModule {}
