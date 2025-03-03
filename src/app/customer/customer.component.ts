import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../models/customer';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {



  dataSource: Customer[] = []; // Inicializado como array vazio
  listOfDisplayData: Customer[] = [];


  totalCustomers = 0;
  activeCustomers = 0;
  inactiveCustomers = 0;



  searchValue = '';
  visible = false;
  visible1 = false; // Controla a visibilidade do modal

  constructor(private http: HttpClient, private customerService: CustomerService) {
  }


  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    address: new FormControl('', Validators.required),
    status: new FormControl('ATIVO', Validators.required),
    valve: new FormControl(1073741824, [Validators.required, Validators.min(0)]),
    monthsInDebt: new FormControl(1, [Validators.required, Validators.min(0)]),
  });


  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.dataSource = customers;
      this.listOfDisplayData = [...this.dataSource]; // Atualiza após receber os dados

      // Calcular Total, Ativos e Inativos
      this.calculateCustomerStats();
    });
  }

  calculateCustomerStats() {
    this.totalCustomers = this.dataSource.length;
    this.activeCustomers = this.dataSource.filter(customer => customer.status === 'ATIVO').length;
    this.inactiveCustomers = this.dataSource.filter(customer => customer.status === 'INATIVO').length;
  }


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

  open(): void {
    this.visible1 = true;
  }

  close(): void {
    this.visible1 = false;
  }

  public createCustomer() {
    if (this.customerForm.invalid) {
      console.error('Erro: O formulário contém campos inválidos.');
      return;
    }

    this.customerService.addCustomer(this.customerForm.value).subscribe({
      next: (newCustomer) => {
        console.log('Cliente adicionado com sucesso:', newCustomer);
        this.getCustomers();
        this.dataSource = [...this.dataSource, newCustomer];
        this.listOfDisplayData = [...this.dataSource]; // Atualiza a tabela
        this.calculateCustomerStats(); // Atualiza os dados estatísticos
        this.customerForm.reset({status: 'ATIVO', valve: 1073741824, monthsInDebt: 1}); // Reseta o formulário
        this.close(); // Fecha o modal
      },
      error: (err) => {
        console.error('Erro ao adicionar cliente:', err);
      },
    });
  }
}
