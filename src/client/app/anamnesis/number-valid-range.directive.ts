import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidatorFn, NG_VALIDATORS, Validator, Validators, AbstractControl } from '@angular/forms';

/*
Usage: attribute directive, added to an input like this:
<input type="text" numberValidRange="5-105"...
*/


@Directive({
  selector: '[numberValidRange]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NumberValidRangeDirective, multi: true }]
})
export class NumberValidRangeDirective implements Validator, OnChanges {
  @Input() numberValidRange: string;

  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['numberValidRange'];
    if (change) {
      const val: string = change.currentValue;
      const args: string[] = val.split('-');
      this.valFn = numValidator(parseInt(args[0]), parseInt(args[1]));
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}

export function numValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    if(isNaN(val)) {
      return { 'invalidNumber': '' };
    };
    const numVal: number = parseInt(val);
    if (numVal < min) {
      return { 'minNumber': min };
    };
    if (numVal > max) {
      return { 'maxNumber': max };
    }
    return null; // number is OK
  };
}
