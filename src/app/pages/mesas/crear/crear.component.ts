import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Mesa } from '../../../modelos/mesa.model';
import { MesaService } from '../../../servicios/mesa.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_mesa: string = "";
  intentoEnvio: boolean = false;
  laMesa: Mesa = {
    numced: "",
    nummesa: ""
  }
  constructor(private miServicioMesas: MesaService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_mesa) {
      this.modoCreacion = false;
      this.id_mesa = this.rutaActiva.snapshot.params.id_mesa;
      this.getMesa(this.id_mesa)
    } else {
      this.modoCreacion = true;
    }
  }
  getMesa(id: string) {
    this.miServicioMesas.getmesa(id).
      subscribe(data => {
        this.laMesa = data;
      });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioMesas.crear(this.laMesa).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'El mesa ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/mesas/listar"]);
        });
    }

  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioMesas.editar(this.id_mesa, this.laMesa).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El mesa ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/mesas/listar"]);
        });
    }

  }
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.laMesa.numced=="" || 
       this.laMesa.nummesa==""){
        
      return false;
    }else{
      return true;
    }
  }
}

