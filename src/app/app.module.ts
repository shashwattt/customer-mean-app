import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { Toolbar } from './components/toolbar/toolbar.comp';
import { CustomerCreate } from './components/customerCreate/customerCreate.comp';
import { Main } from './components/main/main.comp';
import { Customers } from './components/customers/customers.comp';
import { Report } from './components/report/report.comp';

import { CustomerService } from './services/customer.service';

@NgModule({
  declarations: [
    AppComponent,
    Toolbar,
    Main,
    CustomerCreate,
    Customers,
    Report
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
