import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorDirective } from './directives/validation-error.directive';
import { FormatDatePipe } from './pipes/format-date.pipe';

@NgModule({
  declarations: [
    ValidationErrorDirective,
    FormatDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidationErrorDirective,
    FormatDatePipe
  ]
})
export class SharedModule { }