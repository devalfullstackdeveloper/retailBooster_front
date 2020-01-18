import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  cms_title:any = "";
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	this.getCMS("C1578474595");
  }

  getCMS(cms_no) {
    this.apiService.getCMS({cmsNumber:cms_no})
    .subscribe(
      data => {
        if(data.status) {
          this.cms_title = data.data.pageTitle;
          document.getElementById('content').innerHTML = data.data.pageContent;
        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });
  }

}
