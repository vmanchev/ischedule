import { Injectable } from '@angular/core';
import { TaskDbModel } from './task-db.model';
import { TaskStorageModel } from './task-storage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key = 'ischeduleStorage';

  addRule(item: TaskStorageModel) {
    let existingItems =
      JSON.parse(localStorage.getItem(this.key) as string) ??
      ({
        items: [],
      } as TaskDbModel);

    existingItems.items.push(item);

    localStorage.setItem(this.key, JSON.stringify(existingItems));
  }

  getAll(): TaskStorageModel[] {
    return JSON.parse(localStorage.getItem(this.key) as string)?.items ?? [];
  }

  getRuleById(id: string) {
    return this.getAll().find((item) => item.id === id);
  }

  updateRule(updatedItem: any) {
    let items = this.getAll();

    items = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });

    localStorage.setItem(this.key, JSON.stringify({ items }));
  }

  deleteItem(id: string): void {
    localStorage.setItem(
      this.key,
      JSON.stringify({ items: this.getAll().filter((item) => item.id !== id) })
    );
  }
}
