import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderMessage } from 'src/app/_resources/order-message';
import { UnreadMessages } from 'src/app/_resources/unread-messages';
import { ApiCallService } from 'src/app/_services/api-call.service';

@Component({
  selector: 'app-order-all-unseen-msgs',
  templateUrl: './order-all-unseen-msgs.component.html',
  styleUrls: ['./order-all-unseen-msgs.component.css']
})
export class OrderAllUnseenMsgsComponent implements OnInit {

  @ViewChild('paginatorUnreadMessages') paginatorUnreadMessages: MatPaginator;  
  displayedColumns: string[] = [ 'id', 'email', 'ordername' ,'orderStatus' ,  'readByYou' , 'viewOrder'  ];
  unreadMessagesDatasource = new MatTableDataSource<UnreadMessages>();

  constructor(
    public apiCallService: ApiCallService 
    ,private router: Router) { }

  ngOnInit(): void {

    let resp = this.apiCallService.executeGet("/order/unread-messages");


      
    resp
    .subscribe(
      (response: any) => {
         this.unreadMessagesDatasource = new MatTableDataSource(response);
         this.unreadMessagesDatasource.paginator = this.paginatorUnreadMessages;





      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  }


  viewOrder(od : any){
    this.router.navigate(['/shop-owner-edit-order',{orderId: od}]);
    
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }

}
