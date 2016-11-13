import { NgModule } from '@angular/core';
import { AnamnesisService } from './anamnesis.service';
import { CommonModule } from '@angular/common';
import { AnamnesisFormComponent } from './anamnesis-form.component';
import { PaymentComponent } from './payment.component';
import { AuthModule } from '../auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ImageUploadModule } from 'ng2-imageupload';

@NgModule({
  imports: [CommonModule, SharedModule, AuthModule, FormsModule, ImageUploadModule],
  declarations: [AnamnesisFormComponent, PaymentComponent],
  exports: [AnamnesisFormComponent, PaymentComponent],
  providers: [AnamnesisService]
})
export class AnamnesisModule { }
