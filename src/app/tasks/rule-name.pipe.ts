import { Pipe, PipeTransform } from '@angular/core';
import { RRule } from 'rrule';

@Pipe({
  name: 'ruleName',
})
export class RuleNamePipe implements PipeTransform {
  transform(rule: string): string {
    return RRule.fromString(rule).toText();
  }
}
