import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import axios from 'axios';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  constructor() { }

  public userDetails = {};
  public publishedJobs = [];
  public appliedJobs = [];
  public address = {};

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem("userData"));
    let addressTemp = JSON.parse(sessionStorage.getItem("address"));
    this.address = JSON.parse(addressTemp);
    this.getUserJobDetails();
  }

  getUserJobDetails() {
    let self = this;
    axios.get(environment.apiUrl + 'getJobs/?user_id=' + this.userDetails['user_id'] + '&&role=Publisher').then(function (response) {
      if (response.data.length != 0) {
        for (let i = 0; i < response.data.length; i++) {
          self.publishedJobs.push({
            "job_id": response.data[i].job_id,
            "job_title": response.data[i].job_title,
            "category": response.data[i].category,
            "salary": response.data[i].salary,
            "address": JSON.parse(response.data[i].address),
            "date": response.data[i].date,
            "description": response.data[i].description
          })
        }
      }
    });

    axios.get(environment.apiUrl + 'getJobs/?user_id=' + this.userDetails['user_id'] + '&&role=Applicant').then(function (response) {
      if (response.data.length != 0) {
        for (let i = 0; i < response.data.length; i++) {
          self.appliedJobs.push({
            "job_id": response.data[i].job_id,
            "job_title": response.data[i].job_title,
            "category": response.data[i].category,
            "salary": response.data[i].salary,
            "address": JSON.parse(response.data[i].address),
            "date": response.data[i].date,
            "description": response.data[i].description
          })
        }
      }
    });
  }

}
