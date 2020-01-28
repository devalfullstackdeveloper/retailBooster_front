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
  form:any = {fullName:"",email:"",mobileNumber:"",subject:"",description:""};
  success:any = "";
  error:any = "";
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

  submitContact() {
    console.log(this.form);
    this.apiService.sendContactMessage(this.form)
    .subscribe(
      data => {

        if(data.status) {
          this.form = {fullName:"",email:"",mobileNumber:"",subject:"",description:""};
          this.success = data.message;
        }
        else
        {
          this.error = data.message;
        }
        
      },
      error => {
          this.error = error.error.message;
      });
  }

}
