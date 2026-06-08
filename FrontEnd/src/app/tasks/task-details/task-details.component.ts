import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: Task | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tasksService = inject(TasksService);

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      return;
    }

    this.tasksService.getTaskById(taskId).subscribe({
      next: task => this.task = task,
      error: () => this.task = null
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
