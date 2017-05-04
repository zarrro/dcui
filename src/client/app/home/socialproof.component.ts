import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'social-proof',
  templateUrl: 'socialproof.component.html'
})

export class SocialproofComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    $('.parallax').parallax();
  }
}
