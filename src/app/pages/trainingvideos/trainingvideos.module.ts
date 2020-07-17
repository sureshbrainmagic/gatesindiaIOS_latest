import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrainingvideosPageRoutingModule } from './trainingvideos-routing.module';
import { TrainingvideosPage } from './trainingvideos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TrainingvideosPageRoutingModule
  ],
  declarations: [TrainingvideosPage]
})
export class TrainingvideosPageModule {}
