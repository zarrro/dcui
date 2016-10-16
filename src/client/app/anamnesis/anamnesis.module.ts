import { NgModule } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';
import { CommonModule } from '@angular/common';
import { AnamnesisFormComponent } from './anamnesis-form.component';
import { AuthModule } from '../auth/auth.module';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [CommonModule, AuthModule, FormsModule],
  declarations: [AnamnesisFormComponent],
  exports: [AnamnesisFormComponent],
  providers: [AnamnesisService]
})
export class AnamnesisModule { }
