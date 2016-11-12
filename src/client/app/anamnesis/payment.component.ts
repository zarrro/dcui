import { Component, AfterViewInit, trigger, style, transition, animate } from '@angular/core';
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

  constructor(private router: Router) {}

  // for animation
  isVisible:string = 'no';

  //form fields
  email: string;
  confirmEmail: string;

  ngAfterViewInit() {
    this.isVisible = 'yes';
  }

  onSubmit(v: any) {
    console.log(v);
    setTimeout(() => { this.router.navigate(['anamnesisForm']); }, 300);
  }
}
