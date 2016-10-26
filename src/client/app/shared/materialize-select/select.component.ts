import { Component, Input, AfterViewInit } from '@angular/core';

// Simple select component for materialize-css framework.
// The materialize-css framework requires init JS to be invoked for 'select' element when it's added to the DOM tree.
// This component wraps this logic, so it won't polute the UI tamplates.
// Example usage in a template: <sel [id]="i" [options]="e.answerOptions" [label]="e.question"></sel>

@Component({
  moduleId: module.id,
  selector: 'm-select',
  templateUrl: 'select.component.html'
})
export class SelectComponent implements AfterViewInit {
  @Input() id: string;
  @Input() label: string;
  @Input() options: any[];

  ngAfterViewInit() {
    if(this.id) {
      // optimization to init just the select current select element
      $('#'+this.id).material_select();
    } else {
      // fallback if id is not set - init all select elements
      $('select').material_select();
    }
  }
}
