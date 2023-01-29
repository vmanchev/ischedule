import { Component } from '@angular/core';
import { RRule } from 'rrule';
import { StorageService } from '../storage.service';
import { TaskFormModel } from '../task-form.model';
import { TaskStorageModel } from '../task-storage.model';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
})
export class TasksPage {
  items: TaskStorageModel[] = [];

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.items = this.storageService.getAll();
  }

  ionViewWillLeave() {
    this.items = [];
  }
}
