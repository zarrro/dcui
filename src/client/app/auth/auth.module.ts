import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { LoggedInGuard } from './logged-in-guard';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  providers: [AuthService, LoggedInGuard]
})
export class AuthModule { }
