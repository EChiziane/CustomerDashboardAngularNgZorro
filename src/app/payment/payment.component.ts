import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  dataSource: Payment[] = []; // Inicializado como array vazio
  listOfDisplayData: Payment[] = [];

  totalPayments = 0;
  confirmedPayments = 0;
  unconfirmedPayments = 0;

  searchValue = '';
  visible = false;
  visible1 = false; // Controla a visibilidade do modal

  paymentForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
    referenceMonth: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),
    confirmed: new FormControl(false),
  });

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    this.paymentService.getPayments().subscribe((payments: Payment[]) => {
      this.dataSource = payments;
      this.listOfDisplayData = [...this.dataSource]; // Atualiza após receber os dados

      // Calcular Total, Confirmados e Não Confirmados
      this.calculatePaymentStats();
    });
  }

  calculatePaymentStats() {
    this.totalPayments = this.dataSource.length;
    this.confirmedPayments = this.dataSource.filter(payment => payment.confirmed).length;
    this.unconfirmedPayments = this.dataSource.filter(payment => !payment.confirmed).length;
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.dataSource.filter(
      (item: Payment) => item.referenceMonth.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  open(): void {
    this.visible1 = true;
  }

  close(): void {
    this.visible1 = false;
  }

  public createPayment() {
    if (this.paymentForm.invalid) {
      console.error('Erro: O formulário contém campos inválidos.');
      return;
    }

    this.paymentService.addPayment(this.paymentForm.value).subscribe({
      next: (newPayment) => {
        console.log('Pagamento adicionado com sucesso:', newPayment);
        this.getPayments();
        this.dataSource = [...this.dataSource, newPayment];
        this.listOfDisplayData = [...this.dataSource]; // Atualiza a tabela
        this.calculatePaymentStats(); // Atualiza os dados estatísticos
        this.paymentForm.reset({confirmed: false}); // Reseta o formulário
        this.close(); // Fecha o modal
      },
      error: (err) => {
        console.error('Erro ao adicionar pagamento:', err);
      },
    });
  }
}
