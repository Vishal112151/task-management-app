import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { DueDatePipe } from './pipes/due-date.pipe';

@NgModule({
  declarations: [AutoFocusDirective, DueDatePipe],
  exports: [AutoFocusDirective, DueDatePipe]
})
export class SharedModule {}
