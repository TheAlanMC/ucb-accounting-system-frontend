import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  baseUrl: string = `${environment.API_URL}/api/v1/taxes`;

  constructor(private http: HttpClient) { }

  
}
