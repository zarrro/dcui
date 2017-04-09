import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { IntroComponent } from './intro.component';
import { SocialproofComponent } from './socialproof.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent, IntroComponent, SocialproofComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
