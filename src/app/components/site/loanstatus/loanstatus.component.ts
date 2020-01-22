import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'

@Component({
  selector: 'app-loanstatus',
  templateUrl: './loanstatus.component.html',
  styleUrls: ['./loanstatus.component.css']
})
export class LoanstatusComponent implements OnInit {
  display_block = "store";
  loan_history = [];
  loan_status = {};
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.display_block = "loan_history";
    this.getLoanHistory();
  }


  selectStore() {
    this.display_block = "product";
  }

  selectProduct() {
    this.display_block = "product_detail";
  }

  getLoanHistory(){
    this.apiService.getUserOrders()
    .subscribe(data => {
      if(data.status){
        this.loan_history = data.data
        console.log("Loan-History----",data.data);
      }else{
        alert(data.message);
      }
    },
    error => {
      alert(error.error.message);
    })
  }

  getStatus(orderId){
    
    console.log("Order-Id---",orderId)
    var data ={
      orderId : orderId
    }

    this.apiService.getLoanStatus(data)
    .subscribe(data => {
      if(data.status){
        this.loan_status = data;
        this.display_block = "loan_status";
        console.log("Loan-Status---",data)
      }else{
        alert(data.message)
      }
    },
    error => {
      alert(error.error.message)
    })
  }
}
