import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  constructor(private router: Router) { }

  public editUser = {};
  public address = {};

  ngOnInit() {
    this.editUser = JSON.parse(sessionStorage.getItem("userData"));
    let addressTemp = JSON.parse(sessionStorage.getItem("address"));
    this.address = JSON.parse(addressTemp);
  }

  submit(){
    let self= this;
    this.editUser["address"] = JSON.stringify(this.address);
    axios.put(environment.apiUrl+"users/"+this.editUser["user_id"]+"/",this.editUser).then(function(response){
      if(response.data.length !=0){
        let regEx = /\'/g;
        let address = response.data.address.replace(regEx,"\"");
        sessionStorage.setItem('address',JSON.stringify(address));
        sessionStorage.setItem('userData',JSON.stringify(response.data));
        self.router.navigate(['main']);
      }
    });
  }

}
