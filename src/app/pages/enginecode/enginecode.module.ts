import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EnginecodePageRoutingModule } from './enginecode-routing.module';
import { EnginecodePage } from './enginecode.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EnginecodePageRoutingModule,
    MatSelectModule
  ],
  exports: [
    MatSelectModule
  ],
  declarations: [EnginecodePage]
})
export class EnginecodePageModule {}
