import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AnamnesisModule } from './anamnesis/anamnesis.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes),
    HomeModule, SharedModule.forRoot(), AnamnesisModule, AuthModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
