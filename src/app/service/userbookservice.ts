
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userbookdto } from '../dto/userbookdto';

export const MAIN_URL = 'http://localhost:8081';
const urls = '/api/v1/book';

const UR1L = '/api/v1/rents/new';

@Injectable()
export class Userbookservice {

    constructor(private http: HttpClient){}

    // tslint:disable-next-line: typedef
    saveData(bookDto: Userbookdto): Observable<boolean> {
        return this.http.post<boolean>(MAIN_URL + UR1L, bookDto);
    }
    // getAllAdmins(): Observable<Array<AdminDTO>> {
    //     return this.http.get<Array<AdminDTO>>(MAIN_URL + urls);
    // }
    getBookList(): Observable<any> {
        return this.http.get(MAIN_URL + urls);
    }
}
