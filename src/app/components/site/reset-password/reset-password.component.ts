import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password: string;
  confirmPassword: string;
  public reset_token: string = "";

  error: string = "";
  success: string = "";

  constructor(private apiService: ApiService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    const param = this.route.snapshot.paramMap.get('token');
    if (param) {
        this.reset_token = param;
        console.log(this.reset_token);
    }else{
        this.router.navigate(['auth/login']);
    }

  }

  resetPassword(){
    var request = {
      reset_token: this.reset_token,
      password: this.password,
      confirmPassword: this.confirmPassword
    }

    this.apiService.resetPassword(request)
    .subscribe(data => {
      console.log("Response----",data);
      if(data.status){
        this.success = data.message
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 5000);  //5s
      }else{
        this.error = data.message
      }
    },
    error => {
      this.error = "Something wrong..."
    })
  }

}
