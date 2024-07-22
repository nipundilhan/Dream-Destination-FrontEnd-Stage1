import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { Product } from 'src/app/_resources/product';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductPagination } from 'src/app/_resources/product-pagination';
import { DataServiceService } from 'src/app/_secondary_services/data-service.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'description' , 'images' , 'edit' , 'view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;  
  productDataSource : ProductPagination = new ProductPagination();

  //early code
  productDataSource1 : any;

  public productSlice  : Product[] = [];
  productDetails : Product[] = [];
  lnght : number = 0;

  startPage : number = 0;
  initialPageSize : number = 8;

  totalItems : number = 0;
  pageSize : number = 8;



  //add MatDialogModule app.module.ts
  constructor(public imagesDialog: MatDialog , public apiCallService: ApiCallService , private dataSrvc: DataServiceService ,
    public imageprocessService :ImageprocessService ,private router: Router , private userAuthService: UserAuthService ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    //early code
    //let resp = this.apiCallService.executeGet("/product/all");


    let resp = this.apiCallService.executeGet("/product/all/pagination/"+this.startPage+"/"+this.initialPageSize);
    




    
    resp
    // .pipe(
    //   map((x : Product[] ,  i) => x.map((product : Product) => this.imageprocessService.processProductImages(product)))
    // )
    .subscribe(
      (response: any) => {
        //early code
        // this.productDataSource = new MatTableDataSource(response);
        // this.productDataSource.paginator = this.paginator;


        this.productDataSource = response;
        this.totalItems = response.meta.totalItems;
        this.pageSize = response.meta.pageSize;

        this.productDataSource.items = response.items.map((product : Product) => this.imageprocessService.processProductImages(product));

        this.productDetails = response.items;
        this.lnght = response.meta.totalItems;
        this.productSlice = this.productDetails.slice(this.startPage,this.initialPageSize);


      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );


    /*
    let resp1 = this.apiCallService.executeGet("/product/all-without-meta/pagination/"+this.startPage+"/"+this.initialPageSize);
    
    
    resp1
    .pipe(
      map((x : Product[] ,  i) => x.map((product : Product) => this.imageprocessService.processProductImages(product)))
    )
    .subscribe(
      (response: any) => {       

        //this.productDataSource.items = response;

      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
    */


  }

  
  showImages(product : Product ){
  console.log("hit to the point");
    console.log(product);

    this.imagesDialog.open(ShowProductImagesDialogComponent,
      {
        data:{
          images:product.productImages,
          description:product.description
        },
        height: '450px',width: '350px'
      }
    );


  }

  viewProduct(product : any ){
    this.dataSrvc.setData(product);
    this.userAuthService.setToHome("false");
    //const url = `/view-product;id=${product.id}`;
     const url = '/view-product';
    this.router.navigateByUrl(url, { state: { newTab: true } });
    //window.open(url, '_blank');


    
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }

  editProduct(productId : any ){
    console.log("hit to the point");
    console.log(productId);
    this.router.navigate(['/edit-product',{productId: productId}]);
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }



  onPaginateChange(event: PageEvent) {

    let page = event.pageIndex;
    let size = event.pageSize;

    let resp=this.apiCallService.executeGet("/product/all/pagination/"+page+"/"+size);
    //resp.subscribe((data)=>this.users=data);
    resp.subscribe((data)=>
    {
      this.productDataSource = data;
    });

    let resp1 = this.apiCallService.executeGet("/product/all-without-meta/pagination/"+page+"/"+size);
    
    
    resp1
    .pipe(
      map((x : Product[] ,  i) => x.map((product : Product) => this.imageprocessService.processProductImages(product)))
    )
    .subscribe(
      (response: any) => {       

        this.productDataSource.items = response;

      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  

  }

  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.productDetails.length){
      endIndex = this.productDetails.length
    }

    let resp=this.apiCallService.executeGet("/product/all/pagination/"+event.pageIndex+"/"+event.pageSize);
    //resp.subscribe((data)=>this.users=data);
    resp.subscribe((data)=>
    {
      this.productDetails = data.items;
      this.lnght = data.meta.totalItems;
      this.productSlice =  this.productDetails.slice(0,event.pageSize);
    });


    
  }

}
