import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
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
