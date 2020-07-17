import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnginespecsPageRoutingModule } from './enginespecs-routing.module';

import { EnginespecsPage } from './enginespecs.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnginespecsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EnginespecsPage]
})
export class EnginespecsPageModule {}
