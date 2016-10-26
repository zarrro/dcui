import { Component, OnInit, ElementRef } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';

@Component({
  moduleId: module.id, // this is needed to correctly resolve paths to templateUrl and Css
  templateUrl: 'anamnesis-form.component.html',
  selector: 'anamnesis-form'
})
export class AnamnesisFormComponent implements OnInit {

  entries: string[];
  errorMessage: string;
  yearOfBirth: number[];

  constructor(private elementRef: ElementRef, public anamnesisService: AnamnesisService) {
    this.yearOfBirth = [1984, 1986, 1987, 1988, 1989, 1990, 1991];
  }

  ngOnInit() {
    this.getQuestions();
  }

  /**
   * Handle the anamnesisService observable
   */
  getQuestions() {
    this.anamnesisService.get()
      .then(entries => {
        this.entries = entries;
      })
      .catch(error => this.errorMessage = error);
  }
}
