import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from 'src/app/features/user-accounts/models/user.dto';

@Injectable({
    providedIn: 'root'
})
export class LedgerBookService {
    // private dateTo = new BehaviorSubject<Date>(new Date());
    // private dateFrom = new BehaviorSubject<Date>(new Date());
    // private subaccountIds = new BehaviorSubject<string[]>([]);

    // setdateTo(data: Date) {
    //     this.dateTo.next(data);
    // }

    // getdateTo(): Observable<Date> {
    //     return this.dateTo.asObservable();
    // }

    // setdateFrom(data: Date) {
    //     this.dateFrom.next(data);
    // }

    // getdateFrom(): Observable<Date> {
    //     return this.dateFrom.asObservable();
    // }

    // setsubaccountIds(data: string[]) {
    //     this.subaccountIds.next(data);
    // }

    // getsubaccountIds(): Observable<string[]> {
    //     return this.subaccountIds.asObservable();
    // }
    private dateTo: Date = new Date();
    private dateFrom: Date = new Date();
    private subaccountIds: string[] = [];

   //Getters and setters
    public getdateTo(): Date {
     return this.dateTo;
    }

    public setdateTo(dateTo: any): void {
     this.dateTo = dateTo;
    }

    public getdateFrom(): Date {
     return this.dateFrom;
    }

    public setdateFrom(dateFrom: any): void {
     this.dateFrom = dateFrom;
    }


    public getsubaccountIds(): string[] {
     return this.subaccountIds;
    }

    public setsubaccountIds(subaccountIds: string[]): void {
     this.subaccountIds = subaccountIds;
    }
}
