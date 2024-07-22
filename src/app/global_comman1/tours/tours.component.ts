import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tour } from 'src/app/_resources/tour';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { Observable, map, startWith } from 'rxjs';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {


  lnght : number = 29;
    /**
  public productSlice  : any[] = [];

  constructor() { }


  ngOnInit(): void {

    this.lnght = this.course.length;
    this.productSlice = this.course.slice(0,2);

  }

  course= [
    {'id':1,'name':'Learn Angular','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/angular.jpg'},
    {'id':2,'name':'Learn Typescript','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/typescript.jpg'},
    {'id':3,'name':'Learn Nodejs','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/nodejs.jpg'},
    {'id':4,'name':'Learn Reactjs','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/reactjs.jpg'},
    {'id':5,'name':'Paid Nodejs','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/nodejs.jpg'},
    {'id':6,'name':'Paid Reactjs','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/typescript.jpg'},
    {'id':7,'name':'Paid Nodejs','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/reactjs.jpg'},
    {'id':8,'name':'Paid Reactjs','description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry','image':'../../assets/angular.jpg'},
  ]


  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.course.length){
      endIndex = this.course.length
    }
    this.productSlice =  this.course.slice(startIndex,endIndex)
  }

  */

  public productSlice  : Tour[] = [];

  productDetails : Tour[] = [];

  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.productDetails.length){
      endIndex = this.productDetails.length
    }
    this.productSlice =  this.productDetails.slice(startIndex,endIndex)
  }




  constructor(public apiCallService: ApiCallService,public userService: UserService,  
    public imageprocessService :ImageprocessService  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    let resp = this.userService.getTours();
    console.log("tour packages API eka call wena thanata awa");
    resp
    .pipe(
      map((x : Tour[] ,  i) => x.map((product : Tour) => this.imageprocessService.processPackageImages(product)))
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        this.productDetails = response;
        this.productSlice = this.productDetails.slice(0,8);

      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  }


}
