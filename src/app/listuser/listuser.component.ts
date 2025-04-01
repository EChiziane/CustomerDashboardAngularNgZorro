import { Component } from '@angular/core';
import {User} from '../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-listuser',
  standalone: false,
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.scss'
})
export class ListuserComponent {
  dataSource: User[] = [];
  listOfDisplayData: User[] = [];

  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;

  searchValue = '';
  visible = false;
  visible1 = false; // Controla a visibilidade do modal


  constructor(private http: HttpClient, private userService: AuthService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.dataSource = users;
      this.listOfDisplayData = [...this.dataSource]; // Atualiza após receber os dados

      // Calcular Total, Ativos e Inativos
      this.calculateUserStats();
    });
  }

  calculateUserStats() {
    this.totalUsers = this.dataSource.length;
    this.activeUsers = this.dataSource.filter(user => user.status === 'ACTIVE').length;
    this.inactiveUsers = this.dataSource.filter(user => user.status === 'INACTIVE').length;
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.dataSource.filter(
      (item: User) => item.nome.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  open(): void {
    this.visible1 = true;
  }

  close(): void {
    this.visible1 = false;
  }


  viewUser(data: User) {
    // Implementar visualização do usuário
  }

  editUser(data: User) {
    // Implementar edição do usuário
  }

  deleteUser(data: User) {
    // Implementar exclusão do usuário
  }
}
