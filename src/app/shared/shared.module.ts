import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { PasswordStrengthColorDirective } from './directives/password-strength-color.directive';

@NgModule({
  declarations: [
    FormatDatePipe,
    PasswordStrengthColorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatDatePipe,
    PasswordStrengthColorDirective
  ]
})
export class SharedModule { }