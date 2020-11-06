import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';


@NgModule({
  declarations: [ClientesFormComponent, ClienteListaComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
  ],
  exports:[
    ClientesFormComponent,ClienteListaComponent
  ]
})
export class ClientesModule { }
