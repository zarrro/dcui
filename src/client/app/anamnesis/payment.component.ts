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
  
  constructor(backendService:BackendService, fData: FormData, onPaymentSuccess: any) {
    this.env = 'sandbox'; // Specify 'sandbox' for the test environment
    this.style = {
      size: 'medium',
      color: 'silver',
      shape: 'rect'
    };
    this.commit = true;
    
    this.payment = (resolve, reject) => {
      // tried to use backendService.post here, but this caused errors in checkout.js
      paypal.request.post(backendService.backendURL + '/' + 'payment')
        .then(function(data) { console.log(data); resolve(data.paymentId); })
        .catch(function(err) { console.log(err); reject(err); });  
    }

    this.onAuthorize = (data) => {
      let paymentSuccessFunc = onPaymentSuccess;

      console.log('append form data - payerId:' + data.payerID);
      fData.append('payerId', data.payerID);

      console.log('append form data - paymentId:' + data.paymentID);
      fData.append('paymentId', data.paymentID);

      backendService.post('payment-execute', fData).then(res => {
        console.log("Payment executed successfully");
        console.log(res); 
        paymentSuccessFunc(JSON.parse(res._body).id);
      }).catch(err => { console.log(err); });
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

  constructor(private router: Router, private form: AnamnesisFormService, private bs: BackendService, ) { }

  ngAfterViewInit() {
    this.isVisible = 'yes';

    let backendService = this.bs;
    let r: Router = this.router;
    let formData = new FormData();  
    formData.append('image1', this.form.image1);
    formData.append('image2', this.form.image2);
    formData.append('survey', JSON.stringify(this.form.survey));

    // the function to be executed on successfully authorized payment
    let onPaymentSuccessFunc = (paymentId) => {
      console.log('onPaymentSuccessFunc: ' + paymentId);
      r.navigate(['result', paymentId]);
    }

    // render payment button
    paypal.Button.render(new PaymentButtonConfig(backendService, formData, onPaymentSuccessFunc),'#paypal-button');
  }
}
