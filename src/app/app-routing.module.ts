import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { MainComponent } from './common/main/main.component';
import { JobsearchComponent } from './common/jobsearch/jobsearch.component';
import { SignupComponent } from './common/signup/signup.component';
import { JoblistComponent } from './common/joblist/joblist.component';
import { JobpostComponent } from './common/jobpost/jobpost.component';
import { UserprofileComponent } from './common/userprofile/userprofile.component';
import { EditprofileComponent } from './common/editprofile/editprofile.component';
import { ChangepasswordComponent } from './common/changepassword/changepassword.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'jobsearch',
    component: JobsearchComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'joblist',
    component: JoblistComponent,
  },
  {
    path: 'jobpost',
    component: JobpostComponent,
  },
  {
    path:'userprofile',
    component: UserprofileComponent,
  },
  {
    path:'editprofile',
    component: EditprofileComponent,
  },
  {
    path:'changepassword',
    component: ChangepasswordComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);