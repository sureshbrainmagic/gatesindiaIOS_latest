import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScanPageRoutingModule } from './scan-routing.module';
import { ScanPage } from './scan.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { UploadComponent } from 'src/app/components/upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ScanPageRoutingModule
  ],
  declarations: [ScanPage, UploadComponent],
  entryComponents: [UploadComponent],
  exports: [UploadComponent]
})
export class ScanPageModule {}
