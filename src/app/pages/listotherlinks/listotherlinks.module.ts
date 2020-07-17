import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListotherlinksPageRoutingModule } from './listotherlinks-routing.module';
import { ListotherlinksPage } from './listotherlinks.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ListotherlinksPageRoutingModule
  ],
  declarations: [ListotherlinksPage]
})
export class ListotherlinksPageModule {}
