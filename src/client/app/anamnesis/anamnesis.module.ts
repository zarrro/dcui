import { NgModule } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';
import { CommonModule } from '@angular/common';
import { AnamnesisFormComponent } from './anamnesis-form.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [ CommonModule, AuthModule],
  declarations: [AnamnesisFormComponent],
  exports: [AnamnesisFormComponent],
  providers: [AnamnesisService]
})
export class AnamnesisModule { }
