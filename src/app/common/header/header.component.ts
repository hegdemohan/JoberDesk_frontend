import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../../dataSharingService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public isUserLoggedIn: boolean = false;
  constructor(private router: Router, private dataSharingService: DataSharingService) {
    if(sessionStorage.getItem('isLoggedIn')== "true"){
      this.isUserLoggedIn = true;
    }
    if(!this.isUserLoggedIn){
      this.dataSharingService.isUserLoggedIn.subscribe(value => {
        this.isUserLoggedIn = value;
      });
    }
  }

  ngOnInit() {

  }

  public onLogOut(){
    sessionStorage.clear();
    sessionStorage.setItem('isLoggedIn','false');
    this.isUserLoggedIn = false;
    this.dataSharingService.isUserLoggedIn.next(false);
    this.router.navigate(['main']);
  }
}
