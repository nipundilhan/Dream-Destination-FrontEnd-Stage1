import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });



  constructor(
    private httpclient: HttpClient
  ) { }


  public executePost(url: string,data: any){
    //console.log("this is the calling url " +this.PATH_OF_API +url);
    return this.httpclient.post<any>(this.PATH_OF_API +url,data);
  }

  public executePut(url: string,data: any){
    //console.log("this is the calling url " +this.PATH_OF_API +url);
    return this.httpclient.put<any>(this.PATH_OF_API +url,data);
  }


  public executeGet(url: string){
    return this.httpclient.get<any>(this.PATH_OF_API +url);
  }

  public executeGet1(url: string){
    return this.httpclient.get<any>(url);
  }




}
