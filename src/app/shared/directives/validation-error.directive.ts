import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appValidationError]'
})
export class ValidationErrorDirective {
  private hasView = false;

  @Input() set appValidationError(control: AbstractControl | null) {
    if (!control) return;

    const showError = control.invalid && (control.dirty || control.touched);

    if (showError && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!showError && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
}