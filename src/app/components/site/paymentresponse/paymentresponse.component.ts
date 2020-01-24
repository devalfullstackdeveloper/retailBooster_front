import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-paymentresponse',
  templateUrl: './paymentresponse.component.html',
  styleUrls: ['./paymentresponse.component.css']
})
export class PaymentresponseComponent implements OnInit {
  cms_title:any = "";
  error_msg:any = " Please wait...";
  orderId:any = ""
  transactionId:any = "";
  error:any = "";
  mandateData:any = {};
  remitaTransRef:any = "";
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.transactionId = localStorage.getItem('transactionId');
    this.orderId = localStorage.getItem('orderId');
   
    
    this.apiService.payResponse(this.transactionId)
    .subscribe(
      data => {
        if(data.responseCode=="00")
        {
          this.approveLoan();
        }
        else
        {
          this.error_msg = data.responseMsg;  
        }
        
      },
      error => {
          //alert(error.error.message);
      });
  	
  }

  approveLoan() {
    let request = {orderId:this.orderId}
     this.apiService.approveLoan(request)
    .subscribe(
      data => {
        console.log(data);

        if(data.status)
        {
          this.error_msg = "";
          let tmpMandate = data.otpDetails.authParams;
          this.remitaTransRef = data.otpDetails.remitaTransRef;
          let Mandate = [];



          for (var i = 0; i < tmpMandate.length; i++) {
            let obj = tmpMandate[i];
            Mandate.push({label:obj['label'+(i+1)],param:obj['param'+(i+1)],description:obj['description'+(i+1)],value:""})
          }
          this.mandateData = Mandate;
        }
        else
        {
          this.error_msg = data.message;  
        }
      },
      error => {
          alert(error.error.message);
      });
  }


  mandateAuth() {
    let request = {orderId:this.orderId , remitaTransRef:this.remitaTransRef ,authParams:[]};

    for (var i = 0; i < this.mandateData.length; i++) {
      let obj = this.mandateData[i];
      let tmpObj = {};
      tmpObj["param"+(i+1)] = obj.param;
      tmpObj["value"] = obj.value;
      request.authParams.push(tmpObj);
    }

    this.apiService.mandateActivateOTP(request)
    .subscribe(
      data => {
        if(data.status)
        {
          this.mandateData = [];
          this.error_msg = "Application Submitted";
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
