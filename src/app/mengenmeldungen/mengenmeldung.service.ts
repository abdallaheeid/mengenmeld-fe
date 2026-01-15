import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMengenmeldungRequest, Mengenmeldung } from './mengenmeldung.model';

@Injectable({
  providedIn: 'root',
})
export class MengenmeldungService {
  private readonly httpClient = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/mengenmeldungen';

  getAllMengenMeldungen(): Observable<Mengenmeldung[]> {
    return this.httpClient.get<Mengenmeldung[]>(this.API_URL + '/retrieveAll');
  }

  createMengenmeldung(payload: CreateMengenmeldungRequest): Observable<Mengenmeldung> {
    return this.httpClient.post<Mengenmeldung>(`${this.API_URL}/create`, payload);
  }
}
