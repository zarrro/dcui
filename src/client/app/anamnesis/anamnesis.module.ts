import { NgModule } from '@angular/core';
import { AnamnesisFormService } from './anamnesis-form.service';
import { CommonModule } from '@angular/common';
import { AnamnesisFormComponent } from './anamnesis-form.component';
import { PaymentComponent } from './payment.component';
import { ResultComponent } from './result.component';
import { AuthModule } from '../auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ImageUploadModule } from 'ng2-imageupload';
import { NumberValidRangeDirective } from './number-valid-range.directive';

@NgModule({
  imports: [CommonModule, SharedModule, AuthModule, FormsModule, ImageUploadModule],
  declarations: [AnamnesisFormComponent, PaymentComponent, ResultComponent, NumberValidRangeDirective],
  exports: [AnamnesisFormComponent, PaymentComponent],
  providers: [AnamnesisFormService]
})
export class AnamnesisModule { }
