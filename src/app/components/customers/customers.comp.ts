import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatTableDataSource,MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router'; 
import { CustomerService } from '../../services/customer.service'
import { Customer } from '../../services/Customer'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'customers',
  templateUrl: './customers.comp.html',
  styleUrls: ['./customers.comp.css']
})

export class Customers implements OnInit {
  dataList : Customer[];
  displayedColumns = ['select','Name', 'Email', 'Phone', 'Mobile', 'DOB', 'Address'];
  dataSource = new MatTableDataSource<Customer>(this.dataList);
  selection = new SelectionModel<Customer>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private customerService : CustomerService,
    private _snackBar: MatSnackBar) { 
  }

  ngOnInit(){
    this.populateData();
    this.customerService.customerServiceData = null;
  }

  populateData(){
    // this.dataList = this.customerService.getAllCustomers();
    this.customerService.getCustomers()
    .then((resp) => {
      this.dataList = resp.obj
      this.organizeView(this.dataList);
    })
    .catch((err) => {
    console.log(err);
    });
  }

  organizeView(list){
    this.dataSource = new MatTableDataSource<Customer>(list);
    this.selection = new SelectionModel<Customer>(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  addNewCustomer(){
    this.router.navigate(['create']);
  }

  getAllAddresses(list){
    let add = '';
    list.forEach((item, index) =>{
      add+= (index>0?'; ':'')+ item.Flat +', '+item.Street+', '+item.State+', '+item.Pincode;
    })
    return add;
  }

  deleteCustomers(){
    let ids = [];
    this.selection.selected.forEach((item,index)=>{
      ids.push(item._id);
    })

    this.customerService.deletedSelected(ids)
      .then((resp) => {
        if(resp.status=="success"){
          this._snackBar.open("Sussessfully deleted "+ ids.length + " item (s)", '', {
            duration: 4000,
          });
          console.log('deleted')
          for(let i=this.dataList.length - 1; i>=0; i--){
            if(ids.indexOf(this.dataList[i]._id)>-1){
              this.dataList.splice(i,1);    
            }
          }
          this.organizeView(this.dataList);
          this.selection.clear();
        }
      })
      .catch((err) => {
      console.log(err);
      }); 
  }

  updateCustomer(row){
    console.log(row);
    this.customerService.customerServiceData = row;
    this.router.navigate(['create']);
  }
}
