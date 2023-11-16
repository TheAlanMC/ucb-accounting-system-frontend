import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        //this.showMessage(`Error: ${error.status} - ${error.error.message}`);
        if (error.status === 404) {
          this.router.navigate(['/404']).then(r => console.log('redirect to 404 page'));
        }
        else if (error.status === 403) {
          this.router.navigate(['/403']).then(r => console.log('redirect to 403 page'));
        }
        return throwError(error);
      })
    );
  }


}