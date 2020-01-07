import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loanstatus',
  templateUrl: './loanstatus.component.html',
  styleUrls: ['./loanstatus.component.css']
})
export class LoanstatusComponent implements OnInit {
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
