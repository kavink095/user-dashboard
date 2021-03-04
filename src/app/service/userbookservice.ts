
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userbookdto } from '../dto/userbookdto';

export const MAIN_URL = 'http://localhost:8081';
const urls = '/api/v1/book';

const UR1L = '/api/v1/rents/new';
const URLuser = '/api/v1/users/chkuser';

const URLbook = '/api/v1/book/chkbook';

@Injectable()
export class Userbookservice {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line: typedef
    saveData(bookDto: Userbookdto): Observable<number> {
        return this.http.post<number>(MAIN_URL + UR1L, bookDto);
    }

    checkUser(bookDto: Userbookdto): Observable<string[]> {
        return this.http.post<string[]>(MAIN_URL + URLuser, bookDto.userid);
    }

    checkBook(bookDto: Userbookdto): Observable<string[]> {
        return this.http.post<string[]>(MAIN_URL + URLbook, bookDto.bookrefid);
    }
    // getAllAdmins(): Observable<Array<AdminDTO>> {
    //     return this.http.get<Array<AdminDTO>>(MAIN_URL + urls);
    // }
    getBookList(): Observable<any> {
        return this.http.get(MAIN_URL + urls);
    }
}
