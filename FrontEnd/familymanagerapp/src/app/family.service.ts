import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Family } from './family';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }



  public getFamily(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.apiServerUrl}/family/all`);
  }

  public addFamily(family:Family): Observable<Family>{
    return this.http.post<Family>(`${this.apiServerUrl}/family/add`, family);
  }


  public updateFamily(family:Family): Observable<Family>{
    return this.http.put<Family>(`${this.apiServerUrl}/family/update`, family);
  }

  public deleteFamily(familyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/family/delete/${familyId}`);
  }


}
