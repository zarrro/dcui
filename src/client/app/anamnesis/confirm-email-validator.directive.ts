import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn, Validator, FormControl } from '@angular/forms';


@Directive({
  selector: '[confirmEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmEmailValidatorDirective, multi: true }]
})
export class ConfirmEmailValidatorDirective implements Validator, OnChanges {
    validator: ValidatorFn;
    @Input('confirmEmail') confirmEmail: String;

    constructor() {
        this.validator = this.getValidatorFn();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        this.validator = this.getValidatorFn();
    }

    // validation function
    getValidatorFn() : ValidatorFn {
        // validator fn has closure on the current email value
        let currentEmail = this.confirmEmail;
        console.log('getValidatorFn -> ' + currentEmail);
        return (c: AbstractControl) => {
            if(c.value === currentEmail) {
                return null;
            } else {
                return {
                    valid: false
                };
            };
        };
    }
}

