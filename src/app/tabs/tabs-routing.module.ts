import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('../tasks/taks.module').then((m) => m.TasksPageModule),
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('../manage/manage.module').then((m) => m.ManagePageModule),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('../schedule/schedule.module').then(
            (m) => m.SchedulePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tasks',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tasks',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
