import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePage } from './manage.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePage,
    data: {
      title: 'Create new task',
    },
  },
  {
    path: ':id',
    component: ManagePage,
    data: {
      title: 'Edit task',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePageRoutingModule {}
