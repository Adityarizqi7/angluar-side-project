import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, makeStateKey, TransferState, StateKey } from '@angular/core';

const DEVICE_KEY = makeStateKey<object>('device');
const DEVICE_SHOW_KEY = makeStateKey<object>('device_show');

@Injectable({
  providedIn: 'root'
})

export class UserBioService {
  
  private API_URL_DEVICE = 'https://api.restful-api.dev/objects'; 
  private API_URL_DEVICE_SHOW = 'https://api.restful-api.dev/objects'; 

  constructor(
    private http: HttpClient,
    private state: TransferState
  ) { }

  getUserBio(): Observable<any> {
    const cachedData = this.state.get(DEVICE_KEY, null);

    if(cachedData) {
      return of(cachedData);  
    } else {
      return this.http.get(this.API_URL_DEVICE).pipe(
        map(data => {
          this.state.set(DEVICE_KEY, data);
          return data;
        })
      );
    }
  }

  getUserDetail(id: string): Observable<any> {

    const STATE_KEY: StateKey<any> = makeStateKey<any>('device-detail-' + id);

    const cachedData = this.state.get(STATE_KEY, null);

    if (cachedData) {
      return of(cachedData)
    } else {
      return this.http.get(`${this.API_URL_DEVICE_SHOW}/${id}`).pipe(
        map(data => {
          this.state.set(STATE_KEY, data);
          return data;
        })
      )
    }
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL_DEVICE_SHOW}/${id}`);
  }
}
