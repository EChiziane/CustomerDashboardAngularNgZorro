import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Obtém o token armazenado

    console.log("Token recuperado:", token); // Verifica se o token está sendo recuperado

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Requisição interceptada:", cloned);
      return next.handle(cloned);
    }
    console.log("Requisição sem token:", req);
    return next.handle(req); // Se não houver token, envia a requisição normal
  }

}
