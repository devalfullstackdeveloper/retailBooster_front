import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.css']
})
export class RepaymentComponent implements OnInit {
  display_block = "store";
  constructor() { }

  ngOnInit() {
    this.display_block = "store";
  }


  selectStore() {
    this.display_block = "product";
  }

  selectProduct() {
    this.display_block = "product_detail";
  }
}
