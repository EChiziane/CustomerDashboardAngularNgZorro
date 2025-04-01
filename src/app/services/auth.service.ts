import {Injectable} from '@angular/core';
import {environment} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Observable, take, tap} from 'rxjs';
import {Customer} from "../models/customer";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = environment.baseURL + "/auth"; // Endpoint do login

  constructor(private http: HttpClient) {
  }

  login(login: string, password: string): Observable<{ token: string }> {
    console.log(`${this.baseURL}/login`, {login, password});
    return this.http.post<{ token: string }>(`${this.baseURL}/login`, {login, password}).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Salva o token
      })
    );
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`)
  }

  signup(user:any): Observable<{ token: string }> {
    console.log(`${this.baseURL}/signup`, {user});
    return this.http.post<{ token: string }>(`${this.baseURL}/register`, user);
  }

  logout() {
    localStorage.removeItem('token'); // Remove o token ao sair
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Recupera o token
  }




  public deleteUser(id: any): Observable<User> {
    return this.http.delete<User>(`${this.baseURL}/${id}`)
  }

  public addUser(user: any): Observable<User> {
    return this.http.post<User>(this.baseURL, user).pipe(take(1))
  }


}
