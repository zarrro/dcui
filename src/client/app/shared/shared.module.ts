import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BackendService } from './backend-service/backend-service';
import { NavbarComponent } from './navbar/index';
import { AuthModule } from '../auth/auth.module';
import { SelectComponent } from './materialize-select/select.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, AuthModule],
  declarations: [SelectComponent, NavbarComponent, SelectComponent],
  exports: [NavbarComponent, CommonModule, FormsModule, RouterModule, SelectComponent],
  providers: [BackendService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
