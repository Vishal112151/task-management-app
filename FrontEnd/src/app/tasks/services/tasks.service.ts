import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${environment.apiUrl}/tasks/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/tasks/${task.id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/tasks/${id}`);
  }
}
