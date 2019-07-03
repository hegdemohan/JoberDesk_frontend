import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { listOfCategories } from "../../../environments/environment.prod"
import { DatePipe } from '@angular/common';
import { environment } from "../../../environments/environment.prod"
import axios from "axios";

@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.scss']
})
export class JobpostComponent implements OnInit {

  constructor(public datePipe: DatePipe, private router: Router) { }

  public listOfCategories;
  public jobDetails = {
    "job_title": "",
    "description": "",
    "date": "",
    "salary": null,
    "category": "",
    "address": ""
  };
  public address = {
    "street": "",
    "houseNum": null,
    "pinCode": null,
    "city": ""
  }

  ngOnInit() {
    this.listOfCategories = listOfCategories;
    this.jobDetails.category = "Animal Care & Training"
  }

  postJob() {
    let self = this;
    this.jobDetails.address = JSON.stringify(this.address);
    let date = new Date();
    this.jobDetails.date = this.datePipe.transform(date, 'dd-MM-yyyy');
    axios.post(environment.apiUrl + 'jobs/', this.jobDetails)
      .then(function (response) {
        if (response.data != "" || response.data != undefined || response.data.job_id != []) {
          let userDetails = JSON.parse(sessionStorage.getItem("userData"));
          let role = {
            "role": "Publisher",
            "job_id": response.data.job_id,
            "user_id": userDetails.user_id
          }
          axios.post(environment.apiUrl + 'roles/',role).then(function (resp) {
            self.router.navigate(['main']);
          })
        }
      });
  }

}
