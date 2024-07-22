import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from 'src/app/_resources/file-handle';
import { Product } from 'src/app/_resources/product';
import { ProductUpload } from 'src/app/_resources/product-upload';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserService } from 'src/app/_services/user.service';
import { map } from 'rxjs';
import { CommanDropDown } from 'src/app/_resources/comman-dropdown';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  isNewProduct = true;

  productDetails : ProductUpload[] = [];
  masterTypeId:number = 0;
  masterTypes:CommanDropDown[]= [];

  productTypeId:number = 0;
  productTypes:CommanDropDown[]= [];

  brandId:number = 0;
  brands:CommanDropDown[]= [];

  fileNames : string = "";

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
    public apiCallService: ApiCallService ,
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
          this.brands=response
          console.log("first district name - "+this.masterTypes[0].name);
          
        },
        (error) => {
          alert("error occured");
          
        }       
      );


    }

  ngOnInit(): void {

    
    this.setProduct();
    /*  had to assign a real product object due to below error
          core.mjs:9171 ERROR TypeError: Cannot read properties of undefined (reading 'productImages')
          at CreateProductComponent.onFileSelected (create-product.component.ts:67:20)
    
    console.log("333333333333333333333333333");
    this.product =this.activatedRoute.snapshot.data['product'];
    console.log("444444444444444444444444444");

    console.log("product details 4 - " + this.product.productName);
*/
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'
    if(this.product && this.product.id){
        this.isNewProduct =  false;
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
    console.log("actual price is "+this.product.productTypeId);

    alert(this.fileNames);

    let resp=this.apiCallService.executePost("/products/add-product" , productFormData);

    

    resp.subscribe(
      (response: any)=>{
        productForm.reset();
        
      },
      (error) => {
        alert("error occured");
        
      }       
    );

    this.product.productImages = [];
    this.product.mainImage = [];

  


  }

  public setProduct(){
    /*let resp = this.userService.getProducts();

    resp
    .pipe(
      map((x : ProductUpload[] ,  i) => x.map((product : ProductUpload) => this.imageprocessService.processProductImages(product)))
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        this.productDetails = response;
        this.product= this.productDetails[0];
        this.product.productImages = [];

      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );

*/
    this.product  = {
      id : null,
      code:null,
      productName : "",
      description : "",
      productActualPrice :null,
      quantity :  0,
      brandId : null ,
      productTypeId : null,
      productImages  :[],
      mainImage :[]
    }
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
