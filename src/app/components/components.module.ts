import { NgModule } from '@angular/core';
import { FabsComponent } from './fabs/fabs.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NorecordComponent } from './norecord/norecord.component';
import { CommonModule } from '@angular/common';
// import { UploadComponent } from './upload/upload.component';



@NgModule({
  declarations: [
    FabsComponent,
    HeaderComponent,
    NorecordComponent,
   // UploadComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports: [
    FabsComponent,
    HeaderComponent,
    NorecordComponent,
    // UploadComponent
  ]
})
export class ComponentsModule { }
