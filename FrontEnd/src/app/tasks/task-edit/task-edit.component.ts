import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task | null = null;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.tasksService.getTaskById(taskId).subscribe(task => {
        this.task = task;
      });
    }
  }

  updateTask(task: Task): void {
    this.tasksService.updateTask(task).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
