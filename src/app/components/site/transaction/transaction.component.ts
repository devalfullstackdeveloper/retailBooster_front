import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  display_block = "store";
  transaction_list = [];
  transaction_data = [];
  constructor(private apiService:ApiService, private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem("user")) {
        this.router.navigate(['login']);
    }
    else
    {
      this.display_block = "store";
      this.getTransactionsList();
    }
  }


  selectStore() {
    this.display_block = "product";
  }

  selectProduct() {
    this.display_block = "product_detail";
  }

  getTransactionsList(){
    this.apiService.getUserRepayment()
    .subscribe(data => {
      if(data.status){
        this.transaction_list = data.data
        console.log("Transaction-List---",this.transaction_list);
      }else{
        alert(data.message)
      }
    },
    error => {
      alert(error.error.message);
    })
  }

  getTransaction(data){
    console.log("transaction-data---",data);
    this.transaction_data = data.transactionHistory;
  }
}
