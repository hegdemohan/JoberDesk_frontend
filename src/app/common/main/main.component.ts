import { TemplateRef, Inject } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { listOfCategoriesForSearch } from '../../../environments/environment.prod';
import axios from 'axios';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface DialogData {
  job: {};
  selectedJob: {};
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  // modalRef: BsModalRef;
  public allJobs = [];
  public selectedJob = {};
  public publisher = {};
  public listOfCategories;
  public searchText;
  public jobSearched = false;
  public category;
  animal: string;
  name: string;
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {

  }

  openModal(index) {
    let self = this;
    self.selectedJob = this.allJobs[index];
    self.openDialog(null)
  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: [className]
    });
  }

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialog.open(JobDetailsDialog, {
      width: '250px',
      data: {
        job: this.selectedJob,
        selectedJob: this.selectedJob
      }
    });
  }

  search() {
    let self = this;
    let url = "";
    if ((this.searchText != undefined && this.searchText != "") && this.category != "") {
      url = environment.apiUrl + 'jobSearch/?searchText=' + this.searchText + '&&category=' + this.category;
    } else if (this.searchText == "" && this.searchText == undefined && this.category != 'All') {
      url = environment.apiUrl + 'jobSearch/?category=' + this.category;
    } else {
      this.ngOnInit();
      return;
    }
    axios.get(url).then(function (response) {
      // self.allJobs = response.data;
      self.allJobs = [];
      self.jobSearched = true;
      if (response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          self.allJobs.push({
            "job_id": response.data[i].job_id,
            "job_title": response.data[i].job_title,
            "category": response.data[i].category,
            "salary": response.data[i].salary,
            "address": JSON.parse(response.data[i].address),
            "date": response.data[i].date,
            "description": response.data[i].description
          })
        }
      } else {
        self.openSnackBar("Search returned 0 results", "close", "bg-info");
      }
    }).catch(function () {
      self.openSnackBar("Sorry,Something went wrong", "close", "bg-danger");
    });
  }

  ngOnInit() {
    let self = this;
    self.allJobs = [];
    self.jobSearched = false;
    this.listOfCategories = listOfCategoriesForSearch;
    self.category = self.listOfCategories[0].name;
    self.searchText = "";
    axios.get(environment.apiUrl + 'jobs/').then(function (response) {
      // self.allJobs = response.data;
      for (let i = 0; i < response.data.length; i++) {
        self.allJobs.push({
          "job_id": response.data[i].job_id,
          "job_title": response.data[i].job_title,
          "category": response.data[i].category,
          "salary": response.data[i].salary,
          "address": JSON.parse(response.data[i].address),
          "date": response.data[i].date,
          "description": response.data[i].description
        })
      }
    });
  }
}

@Component({
  selector: 'job-details-dialog',
  templateUrl: 'job-details-dialog.html',
})
export class JobDetailsDialog implements OnInit {
  publisher = {};
  allComments = {};
  public publishedByMe = false;
  public appliedByMe = false;
  public hideButton = "false";
  userLoggedIn = "false";
  public userData = JSON.parse(sessionStorage.getItem('userData'));
  public commentObject = {
    "comment": "",
    "date": "",
    "job_id": null,
    "user_id": null,
    "user_name": ""
  }
  constructor(
    public dialogRef: MatDialogRef<JobDetailsDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog, public datePipe: DatePipe, private _snackBar: MatSnackBar) { }

  rate() {
    this.openModalRating();
  }
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: [className]
    });
  }

  apply() {
    if (sessionStorage.getItem('isLoggedIn') == "true") {
      let url = environment.apiUrl + 'roles/'
      let self = this;
      let data = {
        "role": "Applicant",
        "job_id": this.data.selectedJob['job_id'],
        "user_id": this.userData['user_id']
      }
      axios.post(url, data).then(function () {
        let emailUrl = environment.apiUrl + 'sendMail/?job_id=' + self.data.selectedJob['job_id'] + '&&publisher_id=' + self.publisher['user_id'] + '&&applicant_id=' + self.userData['user_id'];
        axios.get(emailUrl).then(function () {
          self.openSnackBar("You have applied for the job successfully!", "close", "bg-info");
          self.dialogRef.close();
        });
      });
    } else {
      this.openSnackBar("Please Login/Sign Up", "close", "bg-info");
    }
  }

  getComments() {
    let self = this;
    axios.get(environment.apiUrl + 'getComments/?job_id=' + self.data.selectedJob['job_id']).then(function (resp) {
      if (resp.data.length > 0) {
        self.allComments = resp.data;
      }
    });
  }

  ngOnInit() {
    this.userLoggedIn = sessionStorage.getItem('isLoggedIn');
    let self = this;
    self.appliedByMe = false;
    self.publishedByMe = false;
    self.hideButton = "false";
    axios.get(environment.apiUrl + 'getUserDetails/?job_id=' + self.data.selectedJob['job_id']).then(function (response) {
      if (response.data.length > 0) {
        self.publisher = response.data[0];
        self.getComments();
        axios.get(environment.apiUrl + 'checkUserRole/?user_id=' + self.userData['user_id'] + '&&job_id=' + self.data.selectedJob['job_id']).then(function (res) {
          if (res != undefined && res.data.length > 0) {
            if (res.data[0].role == "Publisher") {
              self.publishedByMe = true;
              self.hideButton = "true";
            } else {
              self.appliedByMe = true;
              self.hideButton = "true";
            }
          } else {
            self.publishedByMe = false;
            self.appliedByMe = false;
            self.hideButton = "false";
          }
        });
      }
    });
  }

  addComment() {
    let self = this;
    if (this.commentObject.comment != "") {
      if (this.userData != null) {
        this.commentObject.user_id = this.userData.user_id;
        this.commentObject.job_id = this.data.selectedJob['job_id'];
        this.commentObject.user_name = this.userData.firstName + " " + this.userData.lastName;
        let date = new Date();
        this.commentObject.date = this.datePipe.transform(date, 'dd-MM-yyyy').toString();
      } else {
        self.openSnackBar("Please Login/Sign Up", "close", "bg-info");
        return;
      }
      axios.post(environment.apiUrl + 'comments/', this.commentObject).then(function (response) {
        if (response.data != undefined) {
          self.getComments();
          self.commentObject = {
            "comment": "",
            "date": "",
            "job_id": null,
            "user_id": null,
            "user_name": ""
          }
        }
      });
    } else {
      self.openSnackBar("Please enter some comment", "close", "bg-info");
    }
  }

  openModalRating() {
    const dialogRef = this.dialog.open(RatingsDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let self = this;
        let rating = this.publisher['rating'];
        let total = this.publisher['totalRatings'];
        rating = (rating * total) + result;
        total++;
        let averageRating = (rating / total).toFixed(2);
        this.publisher['rating'] = averageRating;
        this.publisher['totalRatings'] = total;
        axios.put(environment.apiUrl + 'users/' + this.publisher['user_id'] + '/', this.publisher).then(function (response) {
          self.ngOnInit();
        });
      }
    });
  }

}

@Component({
  selector: 'rate-publisher',
  templateUrl: 'rate-publisher.html',
})
export class RatingsDialog {
  constructor(
    public dialogRef: MatDialogRef<RatingsDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  rate(i) {
    this.dialogRef.close(i);
  }
}