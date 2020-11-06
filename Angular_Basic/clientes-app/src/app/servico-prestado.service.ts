import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import {environment} from '../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURL;
  path: string = '/api/servico-prestado';
  apiURLfull: string = this.apiURL+this.path;

  constructor(private http:HttpClient) { }

  salvar( servicoPrestado: ServicoPrestado): Observable<ServicoPrestado>{
    return this.http.post<ServicoPrestado>(`${this.apiURLfull}`,servicoPrestado);
  }

  atualizar( servicoPrestado: ServicoPrestado): Observable<ServicoPrestado>{
    return this.http.put<ServicoPrestado>(`${this.apiURLfull}/${servicoPrestado.id}`,servicoPrestado);
  }

  deletar( servicoPrestado: ServicoPrestado): Observable<any>{
    return this.http.delete<any>(`${this.apiURLfull}/${servicoPrestado.id}`);
  }

  getServicoPrestados() : Observable<ServicoPrestado[]> {
      return this.http.get<ServicoPrestado[]>(`${this.apiURLfull}`);
  }

  getServicoPrestadoById(id: number ) : Observable<ServicoPrestado>{
    return this.http.get<any>(`${this.apiURLfull}/${id}`);
  }
}
