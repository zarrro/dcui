import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TermsPageComponent } from './terms-page.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [TermsPageComponent],
  exports: [TermsPageComponent]
})
export class InfopagesModule { }
