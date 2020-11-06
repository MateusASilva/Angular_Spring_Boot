import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ClientesService } from 'src/app/clientes.service';
import {Cliente} from '../cliente'

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[];
  clienteSelecionado:Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: ClientesService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.getClientes()
    .subscribe(resposta=> this.clientes = resposta);
  }

  novocadastro(){
    this.router.navigate(['/clientes-form']);
  }

  preparaDelecao(cliente:Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(){
    this.service.deletar(this.clienteSelecionado)
    .subscribe(
      resposta=> {
        this.mensagemSucesso = 'Cliente deletado com sucesso';
        this.mensagemErro = null;
        this.ngOnInit();
      },
      erro=> {
        this.mensagemErro = 'Ocorreu um erro ao deletar o cliente';
        this.mensagemSucesso=null;
      });
  }

}

