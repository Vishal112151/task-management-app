import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  readonly displayedColumns = ['title', 'priority', 'status', 'dueDate', 'actions'];
  tasks: Task[] = [];
  private tasksService = inject(TasksService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  createTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  loadTasks(): void {
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  viewTask(task: Task): void {
    this.router.navigate(['/tasks', task.id]);
  }

  editTask(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  deleteTask(task: Task): void {
    const confirmed = confirm(`Delete task "${task.title}"?`);
    if (!confirmed) {
      return;
    }

    this.tasksService.deleteTask(task.id).subscribe(() => {
      this.loadTasks();
    });
  }
}
