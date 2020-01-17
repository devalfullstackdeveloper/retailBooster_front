import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'
import * as moment from 'moment'

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.css']
})
export class RepaymentComponent implements OnInit {
  display_block = "store";
  repayment_list = [];
  repayment_data = [];
  loanAmount = 0
  tenure = 0
  repayment_amount = 0
  next_pay_date = 0
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.display_block = "store";
    this.getRepaymentList();
  }


  selectStore() {
    this.display_block = "product";
  }

  selectProduct() {
    this.display_block = "product_detail";
  }

  getRepaymentList(){
    this.apiService.getUserRepayment()
    .subscribe(data => {
      if(data.status){
        this.repayment_list = data.data
        console.log("Repayment-List---",this.repayment_list);
      }else{
        alert(data.message)
      }
    },
    error => {
      alert(error.error.message)
    })
  }

  getRepayment(event){
    var orderId = event.target.value;
    console.log("OrderId---",orderId);

    if(orderId == 0){
      this.repayment_data = [];
      this.loanAmount = 0;
      this.tenure = 0;
      this.repayment_amount = 0;
      this.next_pay_date = 0;
    }else{
      for(var i=0; i < this.repayment_list.length; i++){
        if(this.repayment_list[i].orderId == orderId){
          this.repayment_data = this.repayment_list[i].repaymentHistory;
          this.loanAmount = this.repayment_list[i].loanAmount;
          this.tenure = this.repayment_list[i].tenorAgreed
          this.repayment_amount = this.repayment_list[i].repaymentAmount
          this.next_pay_date = moment(this.repayment_list[i].nextTransactionDate).diff(moment(), 'days');
        }
      }
    }
    console.log("Repayment----",this.repayment_data);
  }
}
