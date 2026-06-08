import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  constructor(private tasksService: TasksService, private router: Router) {}

  createTask(task: Task): void {
    this.tasksService.createTask(task).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
