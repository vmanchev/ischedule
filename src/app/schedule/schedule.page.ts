import { Component } from '@angular/core';
import { RRule } from 'rrule';
import { StorageService } from '../storage.service';
import { TaskScheduleModel } from '../task-schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  items: TaskScheduleModel[] = [];

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.items = this.storageService
      .getAll()
      .map((item) =>
        RRule.fromString(item.rule)
          .between(new Date('2023-01-01'), new Date('2023-12-31'))
          .map((occuranceDate) => ({
            id: item.id,
            name: item.name,
            occuranceDate,
          }))
      )

      // combine all arrays in one
      .flat()

      // sort in asc order by date
      .sort((a, b) => a.occuranceDate.getTime() - b.occuranceDate.getTime());
  }
}
