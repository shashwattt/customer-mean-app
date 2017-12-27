import { NOTINITIALIZED } from 'dns';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Customer } from './Customer'

const API_URL = '/api/';
@Injectable()
export class CustomerService {
  
	customerServiceData: Customer; 
	aCustomers : Customer[] = [];
	customerMap = new Map();
	getAllCustomers(){
		return this.aCustomers;
	}

	getAllCustomersMap(){
		return this.customerMap;
	}
	constructor(private http: Http){
		this.getCustomers()
			.then((resp) => {
				this.aCustomers = resp.obj
				this.customerMap = new Map(resp.obj.map((i) => [i._id, i]));
		  })
		  .catch((err) => {
			console.log(err);
		  });
 }
	//add new customer Customer
	addCustomer(data:object){
		console.log('In addCustomer service' + data)
		var URL = API_URL + "add/";
		var body = JSON.stringify(data);
		const header = new Headers({'Content-Type':'application/json'});
		return this.http.post(URL,body,{headers:header})
		.map((response: Response) => response.json())
		.toPromise()
		.catch((err: any) => {
			console.log(err);
			return Promise.reject(err);
		});
	}

	getCustomers() {
		return this.http.get(API_URL)
		.map((response: Response) => response.json())
		.toPromise()
		.catch((err: any) => {
		console.log(err);
		return Promise.reject(err);
		});
	}

	deletedSelected(data){
		console.log('In deletedSelected service' + data)
		let URL = API_URL + "delete/";
		let body = JSON.stringify(data);
		const header = new Headers({'Content-Type':'application/json'});
		return this.http.post(URL,body,{headers:header})
		.map((response: Response) => response.json())
		.toPromise()
		.catch((err: any) => {
			console.log(err);
			return Promise.reject(err);
		});
	}

	getReport(){
		let URL = API_URL + "report";
		console.log(URL)
		return this.http.get(URL)
			.map((response: Response) => response.json())
			.toPromise()
			.catch((err: any) => {
				console.log(err);
			return Promise.reject(err);
		});
	}

}
