import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccoutDetailsModel } from '../models/account-details.model';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {

  constructor(private readonly httpClient: HttpClient) { }

  public getAccountDetails(): Observable<AccoutDetailsModel[]> {
    const apiUrl = 'http://starlord.hackerearth.com/bankAccount';
    return this.httpClient.get<AccoutDetailsModel[]>(apiUrl);
  }
}
