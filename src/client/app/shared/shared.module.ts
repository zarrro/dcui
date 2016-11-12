import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BackendService } from './backend-service/backend-service';
import { NavbarComponent } from './navbar/index';
import { FooterComponent } from './footer/index';
import { AuthModule } from '../auth/auth.module';
import { MaterializeDirective } from 'angular2-materialize';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, AuthModule],
  declarations: [NavbarComponent, FooterComponent, MaterializeDirective],
  exports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterModule, MaterializeDirective],
  providers: [BackendService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
