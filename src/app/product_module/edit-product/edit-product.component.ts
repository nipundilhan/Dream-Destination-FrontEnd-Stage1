import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/_resources/file-handle';
import { Product } from 'src/app/_resources/product';
import { ProductUpload } from 'src/app/_resources/product-upload';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserService } from 'src/app/_services/user.service';
import { map } from 'rxjs';
import { CommanDropDown } from 'src/app/_resources/comman-dropdown';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  productDetails : ProductUpload[] = [];
  masterTypeId:number = 0;
  masterTypes:CommanDropDown[]= [];

  productTypeId:number = 0;
  productTypes:CommanDropDown[]= [];

  brandId:number = 0;
  brands:CommanDropDown[]= [];

  fileNames : string = "";

  productId : any;

  /*  had to assign a real product object due to below error
          core.mjs:9171 ERROR TypeError: Cannot read properties of undefined (reading 'productImages')
          at CreateProductComponent.onFileSelected (create-product.component.ts:67:20)
 

  product : ProductUpload = {
    id : null,
    code:null,
    productName : "",
    description : "",
    productActualPrice :null,
    brandId : null ,
    productTypeId : null,
    productImages  :[]
  }
   */

  product : ProductUpload;

  constructor(private sanitizer : DomSanitizer,
    public apiCallService: ApiCallService , private router: Router ,
    private activatedRoute : ActivatedRoute ,public userService: UserService, 
    public imageprocessService :ImageprocessService ) { 

      let resp=this.apiCallService.executeGet("/products/master-types/all");
      resp.subscribe(
        (response: any)=>{
          this.masterTypes=response
          console.log("first district name - "+this.masterTypes[0].name);
          
        },
        (error) => {
          alert("error occured");
          
        }       
      );

      let resp2=this.apiCallService.executeGet("/products/brands");
      resp2.subscribe(
        (response: any)=>{
          this.brands=response;
        },
        (error) => {
          alert("error occured");
          
        }       
      );


    }

  ngOnInit(): void {

    
    this.setProduct();
    
    if(this.product && this.product.id){
        console.log("false");
    }else{
      
    }


    
    

  }


  onFileSelected(event:any){
    if(event.target.files){

      console.log(event);
      const file = event.target.files[0];

      const fileHandle :  FileHandle ={
        file : file,
        url : this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      if(file.type != 'image/jpeg'){
        alert("you can only add jpg images");
        return;
      }
  
      // 1MB = 1,048,576 bytes (1,000,000 approximately)
      if(file.size > 1099999){
        alert("file size should be less than 1MB");
        return;
      }
  
      if(this.product.productImages.length >=3){
        alert("you cannt add more than 1 picture");
        return;
      }


      this.product.productImages.push(fileHandle);
    }

  }


  onFileSelectedMain(event:any){
    if(event.target.files){

      console.log(event);
      const file = event.target.files[0];

      const fileHandle :  FileHandle ={
        file : file,
        url : this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      if(file.type != 'image/jpeg'){
        alert("you can only add jpg images");
        return;
      }
  
      // 1MB = 1,048,576 bytes (1,000,000 approximately)
      if(file.size > 1099999){
        alert("file size should be less than 1MB");
        return;
      }
  
      if(this.product.mainImage.length >=1){
        alert("you cannt add more than 1 picture");
        return;
      }


      this.product.mainImage.push(fileHandle);
    }

  }



  prepareFormData(product: ProductUpload): FormData{
    const formData = new FormData();
    
    formData.append(
      'productReqRespDto',
      new Blob([JSON.stringify(product)] , {type: 'application/json'})
    );

    for(var i = 0 ; i < product.productImages.length ; i++ ){
      formData.append(
        'files',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
      this.fileNames = this.fileNames + " , " +product.productImages[i].file.name;

    }

    for(var i = 0 ; i < product.mainImage.length ; i++ ){
      formData.append(
        'mainFile',
        product.mainImage[i].file,
        product.mainImage[i].file.name
      );
      this.fileNames = this.fileNames + " , " +product.mainImage[i].file.name;

    }

    return formData;
  }

  removeImage(i : number){
    this.product.productImages.splice(i,1);
  }

  removeImageMain(i : number){
    this.product.mainImage.splice(i,1);
  }


  public addProduct(productForm : NgForm){

    const productFormData = this.prepareFormData(this.product);

    alert(this.fileNames);

    let resp=this.apiCallService.executePut("/products/edit-product/"+this.productId , productFormData);

    

    resp.subscribe(
      (response: any)=>{
        alert("product succesfully updated")
        this.router.navigate(['/view-products']);
        
      },
      (error) => {
        alert("error occured");
        
      }       
    );

    this.product.productImages = [];
    this.product.mainImage = [];

  


  }

  public setProduct(){

    this.productId =this.activatedRoute.snapshot.paramMap.get('productId');
    let resp = this.apiCallService.executeGet("/products/"+this.productId);
    resp
    .pipe(map( p => this.imageprocessService.processProductImages(p)))
    .subscribe(
      (response: any) => { // ProductUpload -> any
        console.log("point ekata awa");
        

        this.masterTypeId = response.masterTypeId;

        this.onMStProductTypeSelected(this.masterTypeId);
        
  
        this.product = response;
        this.product.mainImage.push(response.productImages[0]);
        response.productImages.splice(0,1);
        
        console.log("product details 2 - " + this.product.productName);
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );


    
  }

  cancel(){

    this.router.navigate(['/view-products']);

  }


  onMStProductTypeSelected(val:any){

    console.log("drop down value change method called");

    let resp=this.apiCallService.executeGet("/products/master-type/"+val+"/types");

    resp.subscribe(
      (response: any)=>{
        this.productTypes=response
        
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }       
    );
  }

}
