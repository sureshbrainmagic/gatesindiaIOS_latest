import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NetworkdetailsPageRoutingModule } from './networkdetails-routing.module';
import { NetworkdetailsPage } from './networkdetails.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MatSelectModule,
    NetworkdetailsPageRoutingModule
  ],
  declarations: [NetworkdetailsPage]
})
export class NetworkdetailsPageModule {}
