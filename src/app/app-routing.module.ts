  import { NgModule } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { CustomerCreate } from './components/customerCreate/customerCreate.comp'; 
  import { Customers } from './components/customers/customers.comp'; 
  
  
  const routes: Routes = [
    {
      path: '',
      component: Customers
    },
    {
      path: 'create',
      component: CustomerCreate
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  