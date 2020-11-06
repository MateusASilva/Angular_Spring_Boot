import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {Cliente} from '../cliente'
import {ClientesService} from '../../clientes.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    const params: Observable<any>= this.activatedRoute.params;
    params.subscribe(urlParams=> {
      this.id = urlParams['id'];
      if(this.id){
      this.service
      .getClienteById(this.id)
      .subscribe(response => this.cliente = response,
        errorResponse => this.cliente = new Cliente())
      }
    })
  }
  onSubmit(){
    if(this.id){
      this.service
      .atualizar(this.cliente)
      .subscribe( response => {
        console.log(response);
        this.errors = [];
        this.success=true;
      }, errorResponse => {
        this.errors = ["Erro ao Atualizar o cliente"];
        this.success=false;
      })
    } else {
      this.service
      .salvar(this.cliente)
      .subscribe( response => {
        console.log(response);
        this.errors = [];
        this.success=true;
        this.cliente=response;
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        this.success=false;
      })
    }
  }

  voltarparalistagem(){
    this.router.navigate(['/clientes-lista']);
  }

}
