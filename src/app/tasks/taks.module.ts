import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksPage } from './tasks.page';

import { TasksPageRoutingModule } from './tasks-routing.module';
import { RuleNamePipe } from './rule-name.pipe';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TasksPageRoutingModule],
  declarations: [TasksPage, RuleNamePipe],
  providers: [RuleNamePipe],
})
export class TasksPageModule {}
