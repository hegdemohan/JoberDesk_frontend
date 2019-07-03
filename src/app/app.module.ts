import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './common/main/main.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './common/login/login.component';
import { JobsearchComponent } from './common/jobsearch/jobsearch.component';
import { SignupComponent } from './common/signup/signup.component';
import { JoblistComponent } from './common/joblist/joblist.component';
import { JobpostComponent } from './common/jobpost/jobpost.component';
import { UserprofileComponent } from './common/userprofile/userprofile.component';
import { EditprofileComponent } from './common/editprofile/editprofile.component';
import { ChangepasswordComponent } from './common/changepassword/changepassword.component';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from "../app/dataSharingService";
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { JobDetailsDialog } from './common/main/main.component';
import { RatingsDialog } from './common/main/main.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



const appRoutes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'header', component: HeaderComponent,
  },
  {
    path: 'footer', component: FooterComponent,
  },
  {
    path: 'main', component: MainComponent,
  },
  {
    path: 'jobsearch', component: JobsearchComponent,
  },
  {
    path: 'signup', component: SignupComponent,
  },
  {
    path: 'jobpost', component: JobpostComponent,
  },
  {
    path: 'jobList', component: JoblistComponent,
  },
  {
    path: 'userprofile', component: UserprofileComponent,
  },
  {
    path: 'editprofile', component: EditprofileComponent,
  },
  {
    path: 'changepassword', component: ChangepasswordComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    JobsearchComponent,
    SignupComponent,
    JoblistComponent,
    JobpostComponent,
    UserprofileComponent,
    EditprofileComponent,
    ChangepasswordComponent,
    JobDetailsDialog,
    RatingsDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserAnimationsModule
  ],
  entryComponents: [JobDetailsDialog,RatingsDialog],
  providers: [DataSharingService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
