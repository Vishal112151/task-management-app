import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: unknown) {
    return this.http.post<T>(url, body);
  }

  put<T>(url: string, body: unknown) {
    return this.http.put<T>(url, body);
  }
}
