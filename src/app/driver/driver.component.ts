import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  standalone: false
})
export class DriverComponent implements OnInit {
  listOfDisplayData: Driver[] = [];
  totalDrivers = 0;
  totalActiveDrivers = 0;
  totalInactiveDrivers = 0;
  currentEditingDriverId: string | null = null;
  isEditMode: boolean = false; // ou true, dependendo do contexto

  isDriverDrawerVisible = false;
  searchValue = '';
  driverForm!: FormGroup;

  constructor(private driverService: DriverService,
              private fb: FormBuilder,
              private modal: NzModalService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadDrivers();

  }

  private loadDrivers(): void {
    this.driverService.getDrivers().subscribe(drivers => {
      this.listOfDisplayData = drivers;
      this.totalDrivers = drivers.length;
      this.totalActiveDrivers = drivers.filter(d => d.status === 'ACTIVO').length;
      this.totalInactiveDrivers = drivers.filter(d => d.status === 'INACTIVO').length;
    });
  }



  openDriverDrawer(): void {
    this.isDriverDrawerVisible = true;
    this.currentEditingDriverId = null; // Garante que seja criação
    this.driverForm.reset({ status: 'ACTIVO' });
  }



  submitDriver(): void {
    if (this.driverForm.valid) {
      const driverData = this.driverForm.value;

      if (this.currentEditingDriverId) {
        // Editar motorista existente
        this.driverService.updateDriver(this.currentEditingDriverId, driverData).subscribe(() => {
          this.loadDrivers();
          this.closeDriverDrawer();
        });
      } else {
        // Criar novo motorista
        this.driverService.addDriver(driverData).subscribe(() => {
          this.loadDrivers();
          this.closeDriverDrawer();
        });
      }
    }
  }

  get driverDrawerTitle(): string {
    return this.currentEditingDriverId ? 'Edição de Motorista' : 'Criação de Motorista';
  }

  deleteDriver(driver: Driver): void {
    this.modal.confirm({
      nzTitle: 'Tens certeza que quer eliminar o Driver?',
      nzContent: `Motorista: <strong>${driver.Name}</strong>`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzCancelText: 'Não',
      nzOnOk: () =>
        this.driverService.deleteDriver(driver.id).subscribe(() => {
          this.loadDrivers();
        })
    });
  }


  search(): void {
    // Implementa aqui o filtro de pesquisa
  }

  private initForm(): void {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      carDescription: ['', Validators.required],
      status: ['ACTIVO', Validators.required]
    });
  }

  editDriver(driver: Driver): void {
    this.currentEditingDriverId = driver.id;

    this.driverForm.patchValue({
      name: driver.Name,
      phone: driver.Phone,
      carDescription: driver.CarDescription,
      status: driver.status
    });

    this.isDriverDrawerVisible = true;
  }


  closeDriverDrawer(): void {
    this.isDriverDrawerVisible = false;
    this.driverForm.reset({ status: 'ACTIVO' });
    this.currentEditingDriverId = null;
  }


}
