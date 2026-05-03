import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ContactRequest } from '../interfaces/contact-request.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactServiceHttp {
  private readonly apiUrl = `${environment.apiUrl}/clients`;
  private readonly httpClient = inject(HttpClient);
  constructor() {}

  saveContactForm(data: ContactRequest) {
    const httpHeaders = new HttpHeaders({
      'apikey': environment.supabaseAnonKey,
      'Authorization': `Bearer ${environment.supabaseAnonKey}`,
    });
    const mappedData = {
      company: data.company,
      email: data.email,
      name: data.name,
      phone: data.phone,
      project_description: data.projectDescription,
      service: data.service,
    }
    return this.httpClient.post(this.apiUrl, mappedData, { headers: httpHeaders });
  }
}

