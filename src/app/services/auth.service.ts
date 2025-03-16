import {Injectable} from '@angular/core';
import {environment} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

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

  logout() {
    localStorage.removeItem('token'); // Remove o token ao sair
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Recupera o token
  }

}
