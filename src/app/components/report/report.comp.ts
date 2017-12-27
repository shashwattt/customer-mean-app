import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { CustomerService } from '../../services/customer.service';
import { ReportObj } from '../../services/Report'

@Component({
  selector: 'report-view',
  templateUrl: './report.comp.html',
  styleUrls: ['./report.comp.css']
})

export class Report implements OnInit {
  dataList : ReportObj[] = [];
  displayedColumns = ['CustomerName', 'Mobile', 'Phone', 'Email', 'NoOfBills', 'Amount', 'AvgAmount'];
  dataSource = new MatTableDataSource<ReportObj>(this.dataList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _customerService : CustomerService) { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){
    this.populateData();
  }

  populateData(){
    console.log('Callinf back')
    this._customerService.getReport()
    .then((resp) => {
      console.log('In response report')
      console.log(resp);
      let cusMap = this._customerService.getAllCustomersMap();
      resp.obj.forEach(element => {
        var item : ReportObj = {
          CustomerName: cusMap.get(element._id).Name,
          Email: cusMap.get(element._id).Email,
          DOB: cusMap.get(element._id).DOB,
          Phone: cusMap.get(element._id).Phone,
          Mobile: cusMap.get(element._id).Mobile,
          NoOfBills: element.distinctIds.length,
          Amount:element.amount.toFixed(2),
          AvgAmount:(element.amount/element.distinctIds.length).toFixed(2)
        }
        this.dataList.push(item);
      });
      console.log(this.dataList);
      this.organizeView(this.dataList)
    })
    .catch((err) => {
    console.log(err);
    });
  }

  organizeView(list){
    this.dataSource = new MatTableDataSource<ReportObj>(list);
    this.dataSource.paginator = this.paginator;
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];