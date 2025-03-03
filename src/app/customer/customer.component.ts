import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../models/customer';

interface DataItem {
  name: string;
  age: number;
  address: string;
}


@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  dataSource: any;

  constructor(private http: HttpClient,
              private customerService: CustomerService) {
  }


  getCustomers() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
this.dataSource=customers;
    })
  }





  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }


  visible1 = false;

  open(): void {
    this.visible1 = true;
  }

  close(): void {
    this.visible1 = false;
  }


}
