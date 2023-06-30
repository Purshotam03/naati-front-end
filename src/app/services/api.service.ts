import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, credentials);
  }

  signup(user: any): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, user);
  }

  public getLanguages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/languages`);
  }

  // Add more methods for other API endpoints
}
