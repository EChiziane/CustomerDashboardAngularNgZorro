import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  standalone: false
})
export class DriverComponent implements OnInit {
  listOfDisplayData: Driver[] = [];
  totalDrivers = 0;
  isDriverDrawerVisible = false;
  searchValue = '';
  driverForm!: FormGroup;

  constructor(private driverService: DriverService,
              private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadDrivers();
  }

  private loadDrivers(): void {
    this.driverService.getDrivers().subscribe(drivers => {
      this.listOfDisplayData = drivers;
      console.log(drivers);
      this.totalDrivers = drivers.length;
    });
  }

  openDriverDrawer(): void {
    this.isDriverDrawerVisible = true;
  }

  closeDriverDrawer(): void {
    this.isDriverDrawerVisible = false;
    this.driverForm.reset({ status: 'ATIVO' });
  }

  submitDriver(): void {
    if (this.driverForm.valid) {
      this.driverService.addDriver(this.driverForm.value).subscribe(() => {
        this.loadDrivers();
        this.closeDriverDrawer();
      });
    }
  }

  deleteDriver(driver: Driver): void {
    this.driverService.deleteDriver(driver.id).subscribe(() => {
      this.loadDrivers();
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
      status: ['ATIVO', Validators.required]
    });
  }
}
