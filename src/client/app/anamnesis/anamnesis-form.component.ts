import { Component, OnInit, AfterViewInit, ElementRef, trigger, style, transition, animate, ViewChild, ContentChild, Renderer } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AnamnesisFormService } from './anamnesis-form.service';
import 'rxjs/add/operator/toPromise';

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

  onSubmit(v: any) {
    console.log(v);
    this.isVisible = 'no';
    setTimeout(() => { this.router.navigate(['payment']); }, 300);
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
