import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPasswordStrengthColor]'
})
export class PasswordStrengthColorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    if (value.length < 4) {
      this.el.nativeElement.style.borderColor = 'red';
    } else if (value.length < 8) {
      this.el.nativeElement.style.borderColor = 'orange';
    } else {
      this.el.nativeElement.style.borderColor = 'green';
    }
  }
}
