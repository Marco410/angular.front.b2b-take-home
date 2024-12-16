import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  readonly #_http = inject(HttpClient);

  get(path: string) {
    return this.#_http.get<any>(environment.apiEndpoint + path);
  }

  post(url: string, body: any) {
    return this.#_http.post<any>(environment.apiEndpoint + url, body);
  }
}
