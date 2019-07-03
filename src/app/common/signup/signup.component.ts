import { Component, OnInit } from '@angular/core';
import axios from "axios"
import { environment } from "../../../environments/environment.prod";
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  public register = {
    "emailId": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "phoneNumber": "",
    "rating": 0,
    "totalRatings": 0,
    "address": ""
  }
  public phoneNumber;
  public address = {
    "street": "",
    "houseNum": null,
    "pinCode": null,
    "city": ""
  }
  public confirmPassword;

  ngOnInit() {
  }
  validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validation(){
    if(this.register.firstName == ""){
      this.openSnackBar("Please Enter First Name","close","bg-danger");
      return false;
    }else if(this.register.lastName == ""){
      this.openSnackBar("Please Enter Last Name","close","bg-danger");
      return false;
    }else if(!this.validateEmail(this.register.emailId)){
      this.openSnackBar("Please Enter Proper Email ID","close","bg-danger");
      return false;
    }else if(!(this.phoneNumber.toString().length >= 10 && this.phoneNumber.toString().length <= 14)){
      this.openSnackBar("Please Enter Proper Phone Number","close","bg-danger");
      return false;
    }else if(this.register.password !== this.confirmPassword){
      this.openSnackBar("Passwords did not match!","close","bg-danger");
      return false;
    }else{
      return true;
    }
  }
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: [className]
    });
  }
  signup() {
    if(this.validation()){
      this.register.address = JSON.stringify(this.address);
      this.register.phoneNumber = JSON.stringify(this.phoneNumber);
      let self = this;
      axios.post(environment.apiUrl + 'users/', this.register)
        .then(function (response) {
          if(response.data != "" || response.data != undefined){
            self.router.navigate(['login']);
            this.openSnackBar("Successfully Registered","close","bg-info")
          }
        })
        .catch(function(error){
          this.openSnackBar("Sorry,Something went wrong","close","bg-danger");
        });
    }
  }

}

