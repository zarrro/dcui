import { Component, OnInit } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';

@Component({
  moduleId: module.id, // this is needed to correctly resolve paths to templateUrl and Css
  templateUrl: 'anamnesis-form.component.html',
  selector: 'anamnesis-form'
})
export class AnamnesisFormComponent implements OnInit {

  entries: string[];
  errorMessage: string;

  constructor(public anamnesisService: AnamnesisService) { }

  ngOnInit() {
    this.getQuestions();
  }

  /**
   * Handle the anamnesisService observable
   */
  getQuestions() {
    this.anamnesisService.get()
      .then(entries => {this.entries = entries; /* debug */ console.log(this.entries);})
      .catch(error => this.errorMessage = error);
  }
}
