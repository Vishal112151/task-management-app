import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TasksService } from '../tasks/services/tasks.service';
import { Task } from '../tasks/models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;
  completedTasks = 0;
  tasks: Task[] = [];

  private tasksService = inject(TasksService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.updateMetrics(tasks);
    });
  }

  addTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  viewDetails(task: Task): void {
    this.router.navigate([`/tasks/${task.id}`]);
  }

  editTask(task: Task): void {
    this.router.navigate([`/tasks/edit/${task.id}`]);
  }

  statusClass(status: Task['status']): string {
    if (status === 'InProgress') {
      return 'status-in-progress';
    }

    if (status === 'Done') {
      return 'status-completed';
    }

    return 'status-pending';
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task.id).subscribe({
      next: () => this.loadTasks(),
      error: () => console.error('Failed to delete task', task.id)
    });
  }

  private updateMetrics(tasks: Task[]): void {
    this.totalTasks = tasks.length;
    this.pendingTasks = tasks.filter(task => task.status === 'Todo' || task.status === 'Pending').length;
    this.inProgressTasks = tasks.filter(task => task.status === 'InProgress').length;
    this.completedTasks = tasks.filter(task => task.status === 'Done').length;
  }
}
