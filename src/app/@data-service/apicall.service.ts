import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) { }

    createUsers(user: any[]) {
        return this.httpClient.post(`https://reqres.in/api/users`, user).
            pipe(
                map((data: any) => {
                    return data;
                }), catchError(error => {
                    return throwError('Something went wrong!');
                })
            )
    }

    updateUsers(user: any[], id: string) {
        return this.httpClient.put(`https://reqres.in/api/` + id, user).
            pipe(
                map((data: any) => {
                    return data;
                }), catchError(error => {
                    return throwError('Something went wrong!');
                })
            )
    }

    getUsers(id: string) {
        return this.httpClient.get(`https://reqres.in/api/users/` + id).
            pipe(
                map((data: any[]) => {
                    return data;
                }), catchError(error => {
                    return throwError('Something went wrong!');
                })
            )
    }


    deleteUsers(id: string) {
        return this.httpClient.delete(`https://reqres.in/api/users/` + id).
            pipe(
                map((data: any[]) => {
                    return data;
                }), catchError(error => {
                    return throwError('Something went wrong!');
                })
            )
    }
}
