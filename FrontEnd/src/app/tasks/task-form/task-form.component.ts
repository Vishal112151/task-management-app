import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {

  @Input() task: Task | null = null;
  @Input() statusDisabled = false;

  @Output() save = new EventEmitter<Task>();

  priorities = ['Low', 'Medium', 'High'] as const;
  statuses = ['Pending', 'InProgress', 'Done'] as const;

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['', Validators.required],
    status: ['Pending', Validators.required],
    dueDate: [null as Date | null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.task && this.task) {

      const dueDate =
        this.task.dueDate
          ? new Date(this.task.dueDate)
          : null;

      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        status: this.task.status,
        dueDate
      });
    }

    if (!this.task) {
      this.taskForm.patchValue({
        status: 'Pending'
      });
    }
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get priority() {
    return this.taskForm.get('priority');
  }

  get status() {
    return this.taskForm.get('status');
  }

  get dueDate() {
    return this.taskForm.get('dueDate');
  }

  goBack(): void {
    this.location.back();
  }

  submit(): void {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();

      return;
    }

    const formValue = this.taskForm.value as {
      title: string;
      description: string;
      priority: Task['priority'];
      status: Task['status'];
      dueDate: Date | string | null;
    };

    const dueDateValue =
      formValue.dueDate ?? new Date();

    const dueDate =
      dueDateValue instanceof Date
        ? dueDateValue
        : new Date(dueDateValue);

    this.save.emit({
      id: this.task?.id ?? '',
      title: formValue.title,
      description: formValue.description,
      priority: formValue.priority,
      status: formValue.status,
      dueDate: dueDate.toISOString()
    });
  }
}