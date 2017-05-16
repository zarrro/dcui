import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { IntroComponent } from './intro.component';
import { SocialproofComponent } from './socialproof.component';
import { HowitworksComponent } from './howitworks.component';
import { FactsComponent } from './facts.component';
import { TeamComponent } from './team.component';


@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent, IntroComponent, SocialproofComponent, FactsComponent, TeamComponent, HowitworksComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
