import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment.prod';
import { DataSharingService } from '../../dataSharingService';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  constructor(private router: Router, private dataSharingService: DataSharingService,private _snackBar: MatSnackBar) { }
  public userName;
  public password;
  ngOnInit() {

  }
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: [className]
    });
  }
  public onLoginClick() {
    let self = this;
    axios.get(environment.apiUrl + 'login/?emailId=' + this.userName + '&&password=' + this.password)
      .then(function (response) {
        console.log(response)
        if (response.data.length != 0) {
          self.dataSharingService.isUserLoggedIn.next(true);
          sessionStorage.setItem('isLoggedIn', 'true');
          let regEx = /\'/g;
          let address = response.data[0].address.replace(regEx,"\"");
          sessionStorage.setItem('address',JSON.stringify(address));
          sessionStorage.setItem('userData',JSON.stringify(response.data[0]));
          self.router.navigate(['main']);
        }else{
          self.openSnackBar("Incorrect User Name/Password","close","bg-danger");
        }
      })
      .catch(function (error) {
        self.openSnackBar("Sorry,Something went wrong","close","bg-danger");
      })
  }
}
