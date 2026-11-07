import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactRequest } from './contact.model';

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly http = inject(HttpClient);

  envoyer(demande: ContactRequest): Observable<{ ok: true }> {
    return this.http.post<{ ok: true }>('/api/contact', demande);
  }
}
