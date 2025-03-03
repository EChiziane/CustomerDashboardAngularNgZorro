import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {

  dataSource: Customer[] = []; // Inicializado como array vazio
  listOfDisplayData: Customer[] = [];

  constructor(private http: HttpClient, private customerService: CustomerService) {}

  getCustomers() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.dataSource = customers;
      this.listOfDisplayData = [...this.dataSource]; // Atualiza após receber os dados
    });
  }

  searchValue = '';
  visible = false;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.dataSource.filter(
      (item: Customer) => item.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  visible1 = false;

  open(): void {
    this.visible1 = true;
  }

  close(): void {
    this.visible1 = false;
  }

  ngOnInit(): void {
    this.getCustomers();
  }
}
