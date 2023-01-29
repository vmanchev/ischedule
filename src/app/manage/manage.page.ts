import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RRule } from 'rrule';
import { StorageService } from '../storage.service';
import { TaskFormModel } from '../task-form.model';

@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss'],
})
export class ManagePage {
  private defaultForm = {
    name: null!,
    rule: {
      freq: null!,
      dtstart: this.datePipe.transform(
        new Date(),
        'yyyy-MM-ddTHH:mm:ss'
      ) as string,
      byweekday: null,
      bymonth: null,
    },
  };

  ruleForm: TaskFormModel = {
    ...this.defaultForm,
  };

  frequencyOptions = [
    {
      id: RRule.YEARLY,
      name: 'year',
    },
    {
      id: RRule.MONTHLY,
      name: 'month',
    },
    {
      id: RRule.WEEKLY,
      name: 'week',
    },
    {
      id: RRule.DAILY,
      name: 'day',
    },
  ];

  weekdaysOptions = [
    {
      id: RRule.MO,
      name: 'Monday',
    },
    {
      id: RRule.TU,
      name: 'Tuesday',
    },
    {
      id: RRule.WE,
      name: 'Wednesday',
    },
    {
      id: RRule.TH,
      name: 'Thursday',
    },
    {
      id: RRule.FR,
      name: 'Friday',
    },
    {
      id: RRule.SA,
      name: 'Saturday',
    },
    {
      id: RRule.SU,
      name: 'Sunday',
    },
  ];

  monthsOptions = [
    {
      id: 1,
      name: 'January',
    },
    {
      id: 2,
      name: 'February',
    },
    {
      id: 3,
      name: 'March',
    },
    {
      id: 4,
      name: 'April',
    },
    {
      id: 5,
      name: 'May',
    },
    {
      id: 6,
      name: 'June',
    },
    {
      id: 7,
      name: 'July',
    },
    {
      id: 8,
      name: 'August',
    },
    {
      id: 9,
      name: 'September',
    },
    {
      id: 10,
      name: 'October',
    },
    {
      id: 11,
      name: 'November',
    },
    {
      id: 12,
      name: 'December',
    },
  ];

  pageTitle = this.route.snapshot.data['title'];

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ionViewWillEnter() {
    if (this.route.snapshot.params['id']) {
      const item = this.storageService.getRuleById(
        this.route.snapshot.params['id']
      );

      if (item) {
        const rule = RRule.fromString(item.rule);
        rule.options.dtstart = this.datePipe.transform(
          new Date(rule.options.dtstart),
          'yyyy-MM-ddTHH:mm:ss'
        ) as any;

        this.ruleForm = {
          id: item.id,
          name: item.name,
          rule: rule.options,
        };
      }
    }
  }

  onSubmit(form: NgForm) {
    const rule = new RRule({
      ...this.ruleForm.rule,
      dtstart: new Date(this.ruleForm.rule.dtstart),
    });

    if (this.ruleForm.id) {
      // update
      this.storageService.updateRule({
        id: this.ruleForm.id,
        name: this.ruleForm.name,
        rule: rule.toString(),
      });
    } else {
      this.storageService.addRule({
        id: crypto.randomUUID(),
        name: this.ruleForm.name,
        rule: rule.toString(),
      });
    }

    form.reset();

    this.router.navigate(['/tabs/tasks']);
  }

  onDelete() {
    this.storageService.deleteItem(this.ruleForm.id as string);
    this.router.navigate(['/tabs/tasks']);
  }
}
