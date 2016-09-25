import { Component, OnInit } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id, // this is needed to correctly resolve paths to templateUrl and Css
  templateUrl: 'anamnesis-form.component.html',
  selector: 'anamnesis-form'
})
export class AnamnesisFormComponent implements OnInit {

  questions: string[];
  errorMessage: string;

  constructor(public anamnesisService: AnamnesisService,
    private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
    console.log("deleteme: AnamnesisFormComponent.ngOnInit is invoked");
    this.getQuestions();
  }

  /**
   * Handle the anamnesisService observable
   */
  getQuestions() {
    this.anamnesisService.get()
      .then(questions => this.questions = questions)
      .catch(error => this.errorMessage = error);
  }

  logout() {
    let finallizer: (a: any) => void = (val: any) => {
       console.log(val);
       this.router.navigate(['/']);
    };

    this.auth.logout().then(finallizer).catch(finallizer);
  }
}
