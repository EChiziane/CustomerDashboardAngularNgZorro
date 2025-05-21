import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { environment } from '../../environments/environments';
import { Manager } from '../models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private baseURL = environment.baseURL + '/managers';

  constructor(private http: HttpClient) {}

  public getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.baseURL);
  }

  public getManagerById(id: string): Observable<Manager> {
    return this.http.get<Manager>(`${this.baseURL}/${id}`);
  }

  public addManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(this.baseURL, manager).pipe(take(1));
  }

  public deleteManager(id:any): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}
