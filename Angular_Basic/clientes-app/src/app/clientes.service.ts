import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';
import {environment} from '../environments/environment'
import { pathToFileURL } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURL;
  path: string = '/api/clientes';
  apiURLfull: string = this.apiURL+this.path;

  constructor(private http:HttpClient) { }

  salvar( cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiURLfull}`,cliente);
  }

  atualizar( cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiURLfull}/${cliente.id}`,cliente);
  }

  deletar( cliente: Cliente): Observable<any>{
    return this.http.delete<any>(`${this.apiURLfull}/${cliente.id}`);
  }

  getClientes() : Observable<Cliente[]> {
      return this.http.get<Cliente[]>(`${this.apiURLfull}`);
  }

  getClienteById(id: number ) : Observable<Cliente>{
    return this.http.get<any>(`${this.apiURLfull}/${id}`);
  }
/*
  getClientes():Cliente[]{
    let cliente = new Cliente();
    cliente.id=1;
    cliente.nome="eu";
    cliente.dataCadastro="18/04/2020";
    cliente.cpf="12345678901";
    return [cliente];
  }*/
}
