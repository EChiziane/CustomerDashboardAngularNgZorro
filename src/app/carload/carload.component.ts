import { Component } from '@angular/core';
import {CarLoad} from '../models/carlaod';
import {CarloadService} from '../services/carload.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../models/customer';
import {Driver} from '../models/driver';
import {DriverService} from '../services/driver.service';
import {Manager} from '../models/manager';
import {ManagerService} from '../services/manager.service';
import {Sprint} from '../models/sprint';
import {SprintService} from '../services/sprint.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-carload',
  standalone: false,
  templateUrl: './carload.component.html',
  styleUrl: './carload.component.scss'
})
export class CarloadComponent {
  listOfDisplayData: CarLoad[]=[];
  dataDrivers: Driver[]=[];
  dataManagers: Manager[]=[];
  dataSprint:Sprint[]=[];
  totalCarloads=0;
  currentEditingCarloadId:string | null = null;

  private loadData(): void {
    this.loadCarloads();
    this.getDrivers()
    this.getManages()
    this.getSprinters()
  }
  ngOnInit(): void {
    this.loadData();
  }

  constructor(private carloadService: CarloadService,
              private driverService: DriverService,
              private managerService: ManagerService,
              private sprintService: SprintService,
              private message: NzMessageService,
              private fb: FormBuilder) {
    this.initForms();
  }


  private loadCarloads(): void {
    this.carloadService.getCarloads().subscribe(carloads => {
      this.listOfDisplayData = carloads;
      this.totalCarloads = carloads.length;

    });
  }



  getDrivers() {
    this.driverService.getDrivers().subscribe((drivers: Driver[]) => {
      this.dataDrivers = drivers;
    });
  }

  getSprinters(){
    this.sprintService.getSprints().subscribe((sprints: Sprint[]) => {
      this.dataSprint = sprints;
    })
  }


  getManages() {
    this.managerService.getManagers().subscribe((managers: Manager[]) => {
      this.dataManagers = managers;
    });
  }



  editCarload(carload: CarLoad):void{
    this.currentEditingCarloadId = carload.id;
    this.carloadForm.patchValue({
      id: carload.id,
      deliveryDestination: carload.deliveryDestination,
      logisticsManagerName: carload.logisticsManagerName,
      assignedDriverName: carload.assignedDriverName,
      transportedMaterial: carload.transportedMaterial,
      carloadBatchName: carload.carloadBatchName,
      customerPhoneNumber: carload.customerPhoneNumber,
      totalSpent: carload.totalSpent,
      totalEarnings: carload.totalEarnings,
      deliveryStatus: carload.deliveryStatus,
      logisticsManagerId:carload.logisticsManagerId,
      assignedDriverId:carload.assignedDriverId,
      carloadBatchId:carload.carloadBatchId,

    });
    this.isCarloadDrawerVisible=true;
  }


  // Drawer controls
  isCarloadDrawerVisible = false;
  searchValue = '';

  // Carload methods
  openCarloadDrawer(): void {
    this.isCarloadDrawerVisible = true;
    this.currentEditingCarloadId = null;
    this.carloadForm.reset({status: 'Created'});
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

      const carloadData=this.carloadForm.value;

      if(this.currentEditingCarloadId ){
        this.carloadService.updateCarload(this.currentEditingCarloadId,carloadData).subscribe
        ({
          next: () => {
            this.loadCarloads();
            this.closeCarloadDrawer();
            this.message.success("Carload successfully updated!");
          },
          error: err => {
            this.message.error("erro ao atualizar carload");
          }
        })


      }

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
      logisticsManagerId: ['', Validators.required],
      assignedDriverId: ['', Validators.required],
      transportedMaterial: ['', Validators.required],
      carloadBatchId: ['', Validators.required],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      totalSpent: [0, [Validators.required, Validators.min(0)]],
      totalEarnings: [0, [Validators.required, Validators.min(0)]],
      deliveryStatus: ['', Validators.required]
    });
  }



}
