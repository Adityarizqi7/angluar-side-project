// file: user-detail.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private deviceDetail: any;

  setDeviceDetail(data: any) {
    this.deviceDetail = data;
  }

  getDeviceDetail() {
    return this.deviceDetail;
  }

  clearDeviceDetail() {
    this.deviceDetail = null;
  }
}
