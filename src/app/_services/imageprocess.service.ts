import { Injectable } from '@angular/core';
import { FileHandle } from '../_resources/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
import { Tour } from '../_resources/tour';
import { Product } from '../_resources/product';

@Injectable({
  providedIn: 'root'
})
export class ImageprocessService {


  constructor(private sanitizer : DomSanitizer) { }




  public processPackageImages(product : Tour){
    const productImages : any[] = product.productImages;

    const productImagesToFileHandle : FileHandle[] = [];

    for(let i=0 ; i < productImages.length ;  i++){

      const imageFileData = productImages[i];
      const imageBlob =this.dataURItoBlob(imageFileData.uploadResource , imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name , { type : imageFileData.type} );
      const finalFileHandle : FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;
    return product;
  }

  public processProductImages(product : Product){
    const productImages : any[] = product.productImages;

    const productImagesToFileHandle : FileHandle[] = [];

    for(let i=0 ; i < productImages.length ;  i++){

      const imageFileData = productImages[i];
      const imageBlob =this.dataURItoBlob(imageFileData.uploadResource , imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name , { type : imageFileData.type} );
      const finalFileHandle : FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;
    return product;
  }


  public dataURItoBlob(picBytes : any , imageType : any){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0 ; i < byteString.length ; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array],{type : imageType});
    return blob;

  }
}
