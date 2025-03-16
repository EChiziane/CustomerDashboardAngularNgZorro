import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userForm = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  })

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.userForm.value.login, this.userForm.value.password).subscribe({
      next: () => {
        this.router.navigate(['/customer']); // Redireciona após login bem-sucedido
      },
      error: err => {
        console.error('Erro no login', err);
      }
    });
  }
}
