
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { environment } from '../../environments/environments';
import { Driver } from '../models/driver';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseURL = environment.baseURL + "/drivers";

  constructor(private http: HttpClient) { }

  public getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.baseURL);
  }

  public getDriverById(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.baseURL}/${id}`);
  }

  public addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.baseURL, driver).pipe(take(1));
  }

  public deleteDriver(id: string): Observable<Driver> {
    return this.http.delete<Driver>(`${this.baseURL}/${id}`);
  }
}
