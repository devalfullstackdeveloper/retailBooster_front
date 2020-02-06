import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = "";
  error: string = "";
  success: string = "";

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  forgotPassword(): void {
    var request = {
      email:this.email
    }
    this.apiService.forgotPassword(request)
    .subscribe(data => {
      console.log('forgotPassword', data)

      if(data.status){
        this.success = data.message

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 5000);  //5s
      }else{
        this.error = data.message
      }

      // if(data.response.status){
      //   // this.alertService.successPage(data.response.message);
      //   this.router.navigate(['login']);
      // }else{
      //   // this.alertService.error(data.response.message);
      //   //this.router.navigate(['dashboard']);
      // }
    },
    error => {
      this.error = "Something wrong"
    })
  }

}
