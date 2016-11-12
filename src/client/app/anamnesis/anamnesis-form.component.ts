import { Component, OnInit, AfterViewInit, ElementRef, trigger, style, transition, animate } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';
import { Router } from '@angular/router';

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
export class AnamnesisFormComponent implements OnInit, AfterViewInit {

  // for animation
  isVisible:string;

  entries: any;
  sections: any;
  errorMessage: string;
  JSON: any;
  answers: string[];

  formState: string;

  //form fields
  itchy: string;
  hurts: string;
  description: string;
  duration: string;
  coldfeel: string;
  hotfeel: string;
  history: string;
  sex: string;
  age: string;
  previousTreatment: string;
  previousDiagnose: string;

  constructor(private elementRef: ElementRef, public anamnesisService: AnamnesisService, private router: Router) {
    this.JSON = JSON;
    this.isVisible = 'no';
  }

  ngOnInit() {
    // get questions, init answers array
    this.anamnesisService.get()
      .then(data => {
        this.entries = data.entries;
        // this.sections = data.sections;
        this.answers = new Array(this.entries.length);

      })
      .catch(error => this.errorMessage = error);
  }

  ngAfterViewInit() {
    this.isVisible = 'yes';
  }

  onSubmit(v: any) {
    console.log(v);
    this.isVisible = 'no';
    setTimeout(() => { this.router.navigate(['payment']); }, 300);
  }
}
