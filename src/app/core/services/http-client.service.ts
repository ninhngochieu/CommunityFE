import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {async, Observable, of, Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";

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
  private baseUrl = "https://localhost:5001/api/";
  private CONNECTION_ERR = "Vui lòng kiểm tra lại đường truyền";
  private PARAMETER_ERR ="Tham số không hợp lệ";
  private AUTHENTICATION_ERR = "Lỗi phân quyền";
  private FORBIDDEN_RESOURCE_ERR = "Tài nguyên bị ngăn cấm";
  private NOT_FOUND_ERROR = "Không tìm thấy tài nguyên";
  private SERVER_ERR = "Server xảy ra lỗi";

  constructor(protected httpClient: HttpClient, private toastrService:ToastrService) { }

  request(type: Type, action: string, data?: any) {
    switch (type){
      case Type.get: return this.get(action).pipe(map(m=> this.MapToData(m)), catchError(e => this.ProcessError(e)));
      case Type.post: return this.post(action,data).pipe(map(m=> this.MapToData(m)), catchError(e => this.ProcessError(e)));
      case Type.put: return this.put(action, data).pipe(map(m=> this.MapToData(m)), catchError(e => this.ProcessError(e)));
      case Type.delete: return this.delete(action, data).pipe(map(m=> this.MapToData(m)), catchError(e => this.ProcessError(e)));
    }
  }

  private MapToData(m: any) {
    return m.data;
  }

  private post(action: string, data: any) {
    return this.httpClient.post(this.baseUrl + action, data)
  }

  private get(action: string) {
    return this.httpClient.get(this.baseUrl + action)
  }

  private put(action: string, data: any) {
    return this.httpClient.put(this.baseUrl + action, data)

  }

  private delete(action: string, data: any) {
    return this.httpClient.delete(this.baseUrl + action, data)

  }


  private ProcessError(e: HttpErrorResponse) {
    console.log(e)
    if(e.error?.data){
      this.toastrService.error(e.error.data);
    }else {
      switch (e.status){
        case 0: this.toastrService.error(this.CONNECTION_ERR)
          break;
        case 400: this.toastrService.warning(this.PARAMETER_ERR)
          break;
        case 401: this.toastrService.warning(this.AUTHENTICATION_ERR)
          break;
        case 403: this.toastrService.error(this.FORBIDDEN_RESOURCE_ERR)
          break;
        case 404: this.toastrService.error(this.NOT_FOUND_ERROR)
          break;
        case 500: this.toastrService.error(this.SERVER_ERR)
      }
    }
    return new Subject();
  }
}
