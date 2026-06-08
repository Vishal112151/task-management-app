import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements OnInit {
  constructor(private element: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    requestAnimationFrame(() => this.element.nativeElement.focus());
  }
}
