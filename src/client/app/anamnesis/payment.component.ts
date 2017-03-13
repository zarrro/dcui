import { Component, AfterViewInit, trigger, style, transition, animate } from '@angular/core';
import { AnamnesisFormService } from './anamnesis-form.service';
import { BackendService } from '../shared/backend-service/backend-service';
import { Router } from '@angular/router';

declare var paypal: any;

class PaymentButtonConfig {
  env: any;
  style: any;
  commit: boolean;
  onAuthorize: any;
  payment: any;

  constructor() {
    this.env = 'sandbox'; // Specify 'sandbox' for the test environment
    this.style = {
      size: 'medium',
      color: 'silver',
      shape: 'rect'
    };
    this.commit = true;
    
    this.onAuthorize = (data) => {
      // Note: you can display a confirmation page before executing

      let EXECUTE_PAYMENT_URL = 'http://192.168.0.104:8080/payment-execute';

      paypal.request.post(EXECUTE_PAYMENT_URL, { paymentID: data.paymentID, payerID: data.payerID })
          .then(function(data) { console.log("Data: "); console.log(data); })
          .catch(function(err) { console.log("Error: "); console.log(err); });
    }
    
    this.payment = (resolve, reject) => {

      let CREATE_PAYMENT_URL = 'http://192.168.0.104:8080/payment';

      paypal.request.post(CREATE_PAYMENT_URL)
        .then(function(data) { console.log(data); resolve(data.paymentId); })
        .catch(function(err) { console.log(err); reject(err); });  
    }
  };
}

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

    // render payment button
    paypal.Button.render(new PaymentButtonConfig(),'#paypal-button');
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
