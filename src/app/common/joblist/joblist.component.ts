import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss']
})
export class JoblistComponent implements OnInit {
  collection=[
    {
      id: 1,
      job: 'Data Entry',
      company: 'Abasoft',
      location: 'Duisburg',
      Pay:'20€ per hour',
      category:'IT',
      disc:'Data entry operator responsibilities include collecting and entering data in databases and maintaining accurate records of valuable company information. Our ideal candidate has essential data entry skills, like fast typing with an eye for detail and familiarity with spreadsheets and online forms.'
    },
    {
      id: 2,
      job: 'Accountant',
      company: 'K L',
      location: 'Dusseldorf',
      Pay:'18€ per hour',
      category:'Financial',
      disc:'Responsibilities: Providing excellent wait service to ensure satisfaction. Taking customer orders and delivering food and beverages. Making menu recommendations, answering questions and sharing additional information with restaurant patrons.'
    },
    {
      id: 3,
      job: 'Loader',
      company: 'M&G',
      location: 'Koln',
      Pay:'15€ per hour',
      category:'Logistic',
      disc:' person is responsible for helping to load freight onto trucks, trains, and ships to be transported away. He or she also helps unload freight shipped to the warehouse facility.'
    },
    {
      id: 4,
      job: 'Postman',
      company: 'Deushpost',
      location: 'Essen',
      Pay:'25€ per hour',
      category:'Transportation',
      disc:'The role of a postman is to sort and deliver post to addresses on a set route on a daily basis. Many postmen start early and work into the afternoon. The job is ideally suited to someone who likes to be outdoors and enjoys walking or cycling.'
    },
    {
      id: 5,
      job: 'Cleaner',
      company: 'Q&N',
      location: 'Koln',
      Pay:'15€ per hour',
      category:'Healthcare',
      disc:'Responsibilities. Include: Cleaning, stocking and supplying designated facility areas (dusting, sweeping, vacuuming, mopping, cleaning ceiling vents, restroom cleaning etc) Performing and documenting routine inspection and maintenance activities. Carry out heavy cleaning tasks and special projects.'
    },
    {
      id: 6,
      job: 'Car Repairer',
      company: 'Fathi Mart',
      location: 'Kamp-Lintfort',
      Pay:'30€ per hour',
      category:'Automotive Jobs',
      disc:'We are looking for a competitive retail Sales Assistant to help customers identify and purchase products they desire. Sales assistant duties include selling, restocking and merchandising. The goal is to provide high class customer service and to increase companys growth and revenue through sales maximisation.'
    },
    {
      id: 7,
      job: 'Waiter',
      company: 'D J Bar',
      location: 'Kleve',
      Pay:'20€ per hour',
      category:'Restaurant',
      disc:'Responsibilities: Preparing alcoholic or non-alcoholic beverages for bar and patrons. Interacting with customers, taking orders and serving snacks and drinks. Assessing bar customers needs and preferences and making recommendations.'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
