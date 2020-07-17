import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScanhistroyPageRoutingModule } from './scanhistroy-routing.module';
import { ScanhistroyPage } from './scanhistroy.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ScanhistroyPageRoutingModule
  ],
  declarations: [ScanhistroyPage]
})
export class ScanhistroyPageModule {}
