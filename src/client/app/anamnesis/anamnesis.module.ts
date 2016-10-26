import { NgModule } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';
import { CommonModule } from '@angular/common';
import { AnamnesisFormComponent } from './anamnesis-form.component';
import { AuthModule } from '../auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, AuthModule, FormsModule],
  declarations: [AnamnesisFormComponent],
  exports: [AnamnesisFormComponent],
  providers: [AnamnesisService]
})
export class AnamnesisModule { }
