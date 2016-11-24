import { Component, AfterViewInit, trigger, style, transition, animate } from '@angular/core';
import { AnamnesisFormService } from './anamnesis-form.service';
import { BackendService } from '../shared/backend-service/backend-service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id, // this is needed to correctly resolve paths to templateUrl and Css
  templateUrl: 'payment.component.html',
  selector: 'payment',
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
export class PaymentComponent implements AfterViewInit {

  // for animation
  isVisible: string = 'no';

  //form fields
  email: string;
  confirmEmail: string;

  constructor(private router: Router, private form: AnamnesisFormService, private bs: BackendService, ) { }

  ngAfterViewInit() {
    this.isVisible = 'yes';
  }

  onSubmit(v: any) {
    console.log(this.form);

    const formData = new FormData();
    console.log('upload');

    formData.append('image1', this.form.image1);
    formData.append('image2', this.form.image2);
    formData.append('survey', JSON.stringify(this.form.survey));

    this.bs.post('anamnesis', formData).then(res => {
      console.log(res._body);
         this.router.navigate(['result', res._body]);
    }).catch(err => { console.log(err); });
  }
}
