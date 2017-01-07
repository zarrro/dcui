import { Component, AfterViewInit, ElementRef, trigger, style, transition, animate, ViewChild,
  Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AnamnesisFormService } from './anamnesis-form.service';
import 'rxjs/add/operator/toPromise';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

declare var $: any;

@Component({
  moduleId: module.id, // this is needed to correctly resolve paths to templateUrl and Css
  templateUrl: 'anamnesis-form.component.html',
  selector: 'anamnesis-form',
  animations: [
    trigger('isVisibleChanged', [
      transition('no => yes', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ]),
      transition('yes => no', [
        animate('0.3s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AnamnesisFormComponent implements AfterViewInit {

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 160,
    resizeMaxWidth: 160
  };

  isVisible: string; // for animation
  entries: any;
  sections: any;
  errorMessage: string;
  JSON: any;
  formState: string;
  submitClicked: boolean;

  formErrors: {[key: string]: string} = {
    'age': '',
    'history': '',
    'description': '',
    'image1': '',
    'image2': ''
  };

  // ### is a placeholder. It will be replaced with the current value for the given error key
  // It's optional. For some error keys value may be needed
  //   (e.g. for minNumber to show what's the current limit)
  // for other keys, values should not be included in the message
  // (e.g. required has value "true", which will be odd for user message)

  validationMessages:{[key: string]:{[key: string]: string}} = {
    'age': {
      'required': 'Age is required.',
      'invalidNumber': 'Invalid number',
      'minNumber': 'Minimal age is: ###',
      'maxNumber': 'Maximal age is: ###',
      'min': 'Minimal age',
      'max': 'Maximal age'
    },
    'image1': {
      'required': 'Overview photo is required.',
    },
    'image2': {
      'required': 'Close up photo is required.',
    },
    'history': {
      'required': 'History of the decease is required.',
    },
    'description': {
      'required': 'Description of your condition is required.',
    }
  };

  ngFormInstance: NgForm;
  @ViewChild('fRef') currentNgForm: NgForm;
  @ViewChild('ageLabel') ageLabel: ElementRef;
  @ViewChild('historyLabel') historyLabel: ElementRef;
  @ViewChild('descriptionLabel') descriptionLabel: ElementRef;

  constructor(private elementRef: ElementRef, public form: AnamnesisFormService, private router: Router,
    private http: Http, private renderer: Renderer) {
    this.JSON = JSON;
    this.isVisible = 'no';
  }

  ngAfterViewInit() {
    this.isVisible = 'yes';
    this.updateTextLabelsState();

    // disable browser's built in validation errors bubbles
    $('input').on('invalid', function(event:any) {
      event.preventDefault();
    });
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentNgForm === this.ngFormInstance) { return; }
    this.ngFormInstance = this.currentNgForm;
    if (this.ngFormInstance) {
      this.ngFormInstance.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.ngFormInstance) { return; }
    const form = this.ngFormInstance.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      $('#' + field + 'errmsg').remove();

      const control = form.get(field);

      if(control) {
        if ((control.dirty || this.submitClicked) && !control.valid) {
          const messages = this.validationMessages[field];
          // there might be more than one errors for the control, but we show just the 1st one
          let key: string;
          for (key in control.errors) {
            break;
          }
          // replace the placeholders (if any) with the actual value of the error key
          this.formErrors[field] += messages[key].replace('###', control.errors[key]);
          let el: any = $('#' + field);
          $('#' + field).after('<p id="' + field + 'errmsg" class="err">' + this.formErrors[field] + '</p>');
          el.removeClass('valid');
          el.addClass('invalid');
        } else if (control.dirty && control.valid) {
          let el: any = $('#' + field);
          el.removeClass('invalid');
          el.addClass('valid');
        } else if (!control.dirty && !this.submitClicked) {
          // cleanup, just in case form is reloaded and the css remain
          $('#' + field).removeClass('invalid valid');
        }
      }
    }
  }

  onUploadPhotoClick(e: any, elref: any) {
    elref.click();
  }

  selectImage1(imageResult: ImageResult, el: any) {
    this.form.image1Resized = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.form.image1 = el.files[0];
  }

  selectImage2(imageResult: ImageResult, el: any) {
    this.form.image2Resized = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.form.image2 = el.files[0];
  }

  submitBtnClicked() {
    console.log('submit button is clicked');
    // $('#text_bio_age_label').attr('data-error', 'age is required');
    // $('#text_bio_age').addClass('invalid');
    this.submitClicked = true;
    this.onValueChanged(undefined);
  }

  onSubmit(f: NgForm) {
    // file input fields for the images can't be validated as part of the ngForm.
    // As a workaround check the model values
    if (f.valid && this.form.image1 && this.form.image2) {
      this.isVisible = 'no';
      console.log(f);
      setTimeout(() => { this.router.navigate(['payment']); }, 300);
    } else {
      console.log('form is not valid');
    }
  }

  onKeyPressFilterNonDigit(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  // make text fields' labels active, if corresponding fields have values already (e.g. when navigate back to the form)
  private updateTextLabelsState() {
    if (this.form.survey.age) {
      this.renderer.setElementClass(this.ageLabel.nativeElement, 'active', true);
    }
    if (this.form.survey.history) {
      this.renderer.setElementClass(this.historyLabel.nativeElement, 'active', true);
    }
    if (this.form.survey.description) {
      this.renderer.setElementClass(this.descriptionLabel.nativeElement, 'active', true);
    }
  }
}
