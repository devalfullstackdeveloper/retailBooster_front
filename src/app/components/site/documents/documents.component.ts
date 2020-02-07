import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  userData:any = {};

  loanId = "";

  error = "";
  
  loading = false;
  selectedBank = '';
  bankStatementFile = '';
  govermentId = '';
  passportOrDrivingLicense = '';
  utilityBill = '';
  settings: any;
  orderApplicationNumber = '';
  modalFile = '';

  passportOrDrivingLicenseFile: File = null;
  bankStatementFileFile: File = null;
  govermentIdFile: File = null;
  utilityBillFile: File = null;


  constructor(private apiService: ApiService , private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("user")) {
      this.loading = true;
      
      this.apiService.getSettingValues().pipe()
      .subscribe(
        data => {

         this.settings = data.data;
         let user = localStorage.getItem("user");
         this.userData = JSON.parse(user);
        

         if(this.userData.loanId && this.userData.loanId!="")
          this.loanId = this.userData.loanId;
      
        this.loading = false; 
        },
        error => {
         this.loading = false;
        });


    }
    else
    {
      this.router.navigate(['login']);
    }
  }

  processFile(event,type) {
      if (event.target.files.length > 0) {
        if(type=='bankStatement'){
           this.bankStatementFileFile = event.target.files[0];
        }
        else if(type=='govermentId') {
           this.govermentIdFile = event.target.files[0];
        }
        else if(type=='passportOrDrivingLicense') {
           this.passportOrDrivingLicenseFile = event.target.files[0];
        }
        else if(type=='utilityBill') {
           this.utilityBillFile = event.target.files[0];
        }
       
      }
    }


    onSubmit() {
      this.loading = true;
      this.apiService.upload_documents(this.bankStatementFileFile,this.govermentIdFile,this.passportOrDrivingLicenseFile,this.utilityBillFile)
      .pipe()
      .subscribe(
        data => {
          this.loading = false;

          if(data.status) {
            for (var i = 0; i < data.data.length; i++) {
              let obj = data.data[i];
              if(obj.name=="Bank Statement") {
                this.userData.bankStatement = obj
              }
              else if(obj.name=="Goverment Id") {
                this.userData.govermentId = obj
              }
              else if(obj.name=="Internatinal Passport Or Driving License") {
                this.userData.passportOrDrivingLicense = obj
              }
              else if(obj.name=="Utility Bill") {
                this.userData.utilityBill = obj
              }
            }
            let data_str = JSON.stringify(this.userData);
            localStorage.setItem("user", data_str);
          }
          this.error = "Document uploaded successfully.";
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }

    setModalFile(f) {
      this.modalFile = f;
    }

}
