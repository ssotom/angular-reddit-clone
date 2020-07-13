import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BaseURL {

    private baseURL: string = 'http://localhost:8080/api/';

    getBaseURL(): string {
        return this.baseURL;
    }

}
