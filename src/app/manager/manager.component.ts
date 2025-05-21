import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manager } from '../models/manager';
import { ManagerService } from '../services/manager.service';
import {NzOptionComponent} from 'ng-zorro-antd/select';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  standalone: false,
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {
  listOfDisplayData: Manager[] = [];
  totalManagers = 0;

  managerForm!: FormGroup;
  isManagerDrawerVisible = false;
  searchValue = '';

  constructor(
    private managerService: ManagerService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadManagers();
  }

  private loadManagers(): void {
    this.managerService.getManagers().subscribe(managers => {
      this.listOfDisplayData = managers;
      this.totalManagers = managers.length;
    });
  }

  openManagerDrawer(): void {
    this.isManagerDrawerVisible = true;
  }

  closeManagerDrawer(): void {
    this.isManagerDrawerVisible = false;
    this.managerForm.reset({
      status: 'Active'
    });
  }

  submitManager(): void {
    if (this.managerForm.valid) {
      this.managerService.addManager(this.managerForm.value).subscribe(() => {
        this.loadManagers();
        this.closeManagerDrawer();
      });
    }
  }

  deleteManager(manager: Manager): void {
    if(manager.id) {
      this.managerService.deleteManager(manager.id).subscribe(() => {
        this.loadManagers();
      });
    }
  }

  search(): void {
    // Implementar filtro de pesquisa se necessário
  }

  private initForm(): void {
    this.managerForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }
}
