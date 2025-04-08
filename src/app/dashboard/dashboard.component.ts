import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from '../models/payment';
import { Customer } from '../models/customer';
import { PaymentService } from '../services/payment.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone:false
})
export class DashboardComponent {
  // Data
  listOfDisplayData: Payment[] = [];
  customersData: Customer[] = [];

  // Statistics
  totalPayments = 0;
  totalAmount = 0;
  totalCustomers = 0;
  activeCustomers = 0;
  inactiveCustomers = 0;

  // Drawer controls
  isPaymentDrawerVisible = false;
  isCustomerDrawerVisible = false;
  searchValue = '';

  // Forms
  paymentForm!: FormGroup;
  customerForm!: FormGroup;

  constructor(
    private paymentService: PaymentService,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private initForms(): void {
    this.paymentForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      paymentMethod: ['Credit', Validators.required],
      numMonths: [1, Validators.required],
      confirmed: [false],
      customerId: [null, Validators.required]
    });

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      status: ['ATIVO', Validators.required],
      valve: [10, [Validators.required, Validators.min(0)]],
      monthsInDebt: [1, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  private loadData(): void {
    this.loadPayments();
    this.loadCustomers();
  }

  private loadPayments(): void {
    this.paymentService.getPayments().subscribe(payments => {
      this.listOfDisplayData = payments;
      this.totalPayments = payments.length;
      this.totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    });
  }

  private loadCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customersData = customers;
      this.totalCustomers = customers.length;
      this.activeCustomers = customers.filter(c => c.status === 'ATIVO').length;
      this.inactiveCustomers = this.totalCustomers - this.activeCustomers;
    });
  }

  // Drawer methods
  openPaymentDrawer(): void {
    this.isPaymentDrawerVisible = true;
  }

  closePaymentDrawer(): void {
    this.isPaymentDrawerVisible = false;
    this.paymentForm.reset({
      paymentMethod: 'Credit',
      numMonths: 1,
      confirmed: false
    });
  }

  openCustomerDrawer(): void {
    this.isCustomerDrawerVisible = true;
  }

  closeCustomerDrawer(): void {
    this.isCustomerDrawerVisible = false;
    this.customerForm.reset({
      status: 'ATIVO',
      valve: 10,
      monthsInDebt: 1
    });
  }

  // Form submissions
  submitPayment(): void {
    if (this.paymentForm.valid) {
      this.paymentService.addPayment(this.paymentForm.value).subscribe(() => {
        this.loadPayments();
        this.closePaymentDrawer();
      });
    }
  }

  submitCustomer(): void {
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value).subscribe(() => {
        this.loadCustomers();
        this.closeCustomerDrawer();
      });
    }
  }

  // Search and filter
  search(): void {
    // Implement your search logic
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  viewPayment(data: Payment) {}

  printPayment(data: Payment) {
    this.paymentService.getPaymentInvoice(data.id).subscribe((payment: Payment) => {
      console.log(data.id);
    });
  }
  deletePayment(data: Payment) {}
}
