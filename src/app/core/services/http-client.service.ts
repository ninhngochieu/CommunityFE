import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {async, Observable, of, Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {WaitingService} from "./waiting.service";
import {PaginationResult} from "../model/Pagination";
import {Member} from "../model/Member";

export enum Type{
  post,
  get,
  put,
  delete,

}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private baseUrl = environment.baseUrl;
  private CONNECTION_ERR = "Vui lòng kiểm tra lại đường truyền";
  private PARAMETER_ERR ="Tham số không hợp lệ";
  private AUTHENTICATION_ERR = "Lỗi phân quyền";
  private FORBIDDEN_RESOURCE_ERR = "Tài nguyên bị ngăn cấm";
  private NOT_FOUND_ERROR = "Không tìm thấy tài nguyên";
  private SERVER_ERR = "Server xảy ra lỗi";

  paginationResult: PaginationResult<Member[]> = new PaginationResult<Member[]>();

  constructor(protected httpClient: HttpClient, private toastService:ToastrService, private router: Router, private waitingService: WaitingService) { }

  request(type: Type, action: string, data?: {}, options?: {}) {
    let req;
    switch (type){
      case Type.get: req = this.get(action, options).pipe(map(m=> HttpClientService.MapToData(m)), catchError(e => this.ProcessError(e)));break;
      case Type.post:req = this.post(action,data,options).pipe(map(m=> HttpClientService.MapToData(m)), catchError(e => this.ProcessError(e)));break;
      case Type.put: req = this.put(action, data,options).pipe(map(m=> HttpClientService.MapToData(m)), catchError(e => this.ProcessError(e)));break;
      case Type.delete: req = this.delete(action, data,options).pipe(map(m=> HttpClientService.MapToData(m)), catchError(e => this.ProcessError(e)));break;
    }
    return req;
  }

  private static MapToData(m: any) {
    let pagination = m as PaginationResult<any>
    if (!pagination){
      return m.data;
    }
    return pagination;
  }

  private post(action: string, data: any, options: {} | undefined) {
    return this.httpClient.post(this.baseUrl + action, data, this.httpOptions())
  }

  private get(action: string, options: {} | undefined) {
    if (options == undefined){
      options = {}
    }
    Object.assign(options, this.httpOptions());
    return this.httpClient.get(this.baseUrl + action, options).pipe(map(response => {
      if(options == {}){
        return response; //Neu khong chua option thi response la result
      }else { // Chua header
        let res = response as HttpResponse<any>;

        this.paginationResult.result = res.body.data;

        let pagination = res.headers.get('Pagination');

        if (pagination !== null){
          this.paginationResult.pagination = JSON.parse(pagination)
        }
        return this.paginationResult;
      }
    }))
  }

  private put(action: string, data: any, options: {} | undefined) {
    return this.httpClient.put(this.baseUrl + action, data, this.httpOptions())

  }

  private delete(action: string, data: any, options: {} | undefined) {
    return this.httpClient.delete(this.baseUrl + action, this.httpOptions())

  }


  private ProcessError(e: HttpErrorResponse) {
    console.log(e)
    if(e.error?.data){
      this.toastService.error(e.error.data);
      switch (e.error.statusCode){
        case 404:
          this.router.navigateByUrl("/notfound").then(r=>r);
          break
      }
    }else {
      switch (e.status){
        case 0: this.toastService.error(this.CONNECTION_ERR)
          break;
        case 400: this.toastService.warning(this.PARAMETER_ERR)
          break;
        case 401: this.toastService.warning(this.AUTHENTICATION_ERR)
          break;
        case 403: this.toastService.error(this.FORBIDDEN_RESOURCE_ERR)
          break;
        case 404:
          this.toastService.error(this.NOT_FOUND_ERROR);
          break;
        case 500: this.toastService.error(this.SERVER_ERR)
      }
    }
    return new Subject();
  }

  private httpOptions() {

    let token = (JSON.parse(<string>localStorage.getItem("user")) as User)?.token ?? "";

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
}
