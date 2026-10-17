import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'https://localhost:7234/api';

@Injectable({
  providedIn: 'root',
})
export class Rest {
  private readonly http = inject(HttpClient);

  Login(data: { email: string; password: string }) {
    return this.http.post(`${BASE_URL}/auth/login`, data);
  }
}
