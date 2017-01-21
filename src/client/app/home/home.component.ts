import { Component, AfterViewInit } from '@angular/core';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    require('js/modernizr.js');
    let initheadline = require('js/init.js');
    initheadline();
  }
}
