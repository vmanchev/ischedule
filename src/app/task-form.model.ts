import { Frequency } from 'rrule';

export interface TaskFormModel {
  id?: string;
  name: string;
  rule: {
    freq: Frequency;
    dtstart: Date | string;
    byweekday: any;
    bymonth: any;
  };
}
