import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagePage } from './manage.page';

import { ManagePageRoutingModule } from './manage-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagePageRoutingModule,
  ],
  declarations: [ManagePage],
  providers: [DatePipe],
})
export class ManagePageModule {}
