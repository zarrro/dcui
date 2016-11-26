import { Component, AfterViewInit, trigger, style, transition, animate } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id, // this is needed to correctly resolve paths to templateUrl and Css
  templateUrl: 'result.component.html',
  selector: 'result',
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
export class ResultComponent implements AfterViewInit {

  // for animation
  isVisible: string = 'no';
  result: string;

  constructor(private route: ActivatedRoute) {
    this.result = this.route.snapshot.params['uuid'];
  }

  ngAfterViewInit() {
    this.isVisible = 'yes';
  }
}
