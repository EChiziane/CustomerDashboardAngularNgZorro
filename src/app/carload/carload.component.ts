import { Component } from '@angular/core';
import {CarLoad} from '../models/carlaod';
import {CarloadService} from '../services/carload.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-carload',
  standalone: false,
  templateUrl: './carload.component.html',
  styleUrl: './carload.component.scss'
})
export class CarloadComponent {
  listOfDisplayData: CarLoad[]=[];
  totalCarloads=0;


  private loadData(): void {
    this.loadCarloads();
  }
  ngOnInit(): void {
    this.loadData();
  }

  constructor(private carloadService: CarloadService,
              private fb: FormBuilder) {
    this.initForms();
  }

  private loadCarloads(): void {
    this.carloadService.getCarloads().subscribe(carloads => {
      this.listOfDisplayData = carloads;
      this.totalCarloads = carloads.length;

    });
  }



  // Drawer controls
  isCarloadDrawerVisible = false;
  searchValue = '';

  // Carload methods
  openCarloadDrawer(): void {
    this.isCarloadDrawerVisible = true;
  }

  // Search and filter
  search(): void {
    // Implement your search logic
  }

  viewCarload(carload: CarLoad) {
    // lógica para visualizar
  }

  printCarload(carload: CarLoad) {
    // lógica para imprimir
  }

  deleteCarload(carload: CarLoad) {
    // lógica para excluir
  }
 carloadForm!: FormGroup;

  closeCarloadDrawer(): void {
    this.isCarloadDrawerVisible = false;
    this.carloadForm.reset({
      status: 'ATIVO',
      valve: 10,
      monthsInDebt: 1
    });
  }

  submitCarload(): void {
    if (this.carloadForm.valid) {
      this.carloadService.addCarload(this.carloadForm.value).subscribe(() => {
        this.loadCarloads();
        this.closeCarloadDrawer();
      });
    }
  }

  private initForms(): void {
    this.carloadForm = this.fb.group({
      deliveryDestination: ['', Validators.required],
      customerName: ['', Validators.required],
      logisticsManagerName: ['', Validators.required],
      assignedDriverName: ['', Validators.required],
      transportedMaterial: ['', Validators.required],
      carloadBatchName: ['', Validators.required],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      totalSpent: [0, [Validators.required, Validators.min(0)]],
      totalEarnings: [0, [Validators.required, Validators.min(0)]],
      deliveryStatus: ['', Validators.required]
    });
  }



}
