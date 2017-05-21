import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn, Validator, FormControl } from '@angular/forms';


@Directive({
  selector: '[emailValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
    validator: ValidatorFn;

    constructor() {
        this.validator = validateEmailFactory();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }
}

// validation function
function validateEmailFactory() : ValidatorFn {
    return (c: AbstractControl) => {

        var EMAIL_REGEXP =
            /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if(c.value && (c.value.length <= 5 || !EMAIL_REGEXP.test(c.value))) {
            return {
                valid: false
            };
        } else {
            return null;
        };
    };
}
