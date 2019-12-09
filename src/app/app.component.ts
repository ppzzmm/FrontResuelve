import { Component, OnInit } from '@angular/core';
import { SueldosService } from '../app/servicios/sueldos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ResuelveFCFront';

  modelRequestSueldos:ModelRequestSueldos;

  modelEquipo:Equipos;
  listaEquipos:Equipos[];
  modelNivel:TipoNiveles;
  listaNiveles:TipoNiveles[];
  modelJugador:Jugadores;
  listaJugadores:Jugadores[];

  //equipoNuevo:string;
  nombreEquipo:string;
  //nivel:string;
  //golesPorMes:number;

  countEquipos:number=0;
  countNiveles:number=0;

  constructor(
    private sueldosService:SueldosService
  ){}

  ngOnInit(){
    this.modelEquipo = new Equipos;
    this.modelNivel = new TipoNiveles;
  }

  async calcularSueldos(){
    this.modelRequestSueldos.jugadores = this.listaJugadores;
    this.modelRequestSueldos.equipos = this.listaEquipos;
    this.sueldosService.calcularSueldos(this.modelRequestSueldos).subscribe(
      data => {
        if(data){
          this.listaJugadores = null;
          this.listaEquipos = null;          
        }
      }
    )
  }

  agregaEqupio(equipoNuevo:string,nivel:string,golesPorMes:number){   
    if(this.nombreEquipo == null && equipoNuevo != null 
      && nivel != null && golesPorMes != null ){
      this.nombreEquipo = equipoNuevo;
      this.modelNivel.nivel = nivel;
      this.modelNivel.golesXmes = golesPorMes;
      this.listaNiveles[this.countNiveles] = this.modelNivel;
      this.countNiveles=this.countNiveles+1;
    }
    if(equipoNuevo != null && this.nombreEquipo != null &&  equipoNuevo == this.nombreEquipo
      && nivel != null && golesPorMes != null){
      this.modelNivel.nivel = nivel;
      this.modelNivel.golesXmes = golesPorMes;
      this.listaNiveles[this.countNiveles] = this.modelNivel;
      this.countNiveles=this.countNiveles+1;
    }
    if(equipoNuevo != null && this.nombreEquipo != null &&  equipoNuevo != this.nombreEquipo
      && nivel != null && golesPorMes != null){
      this.modelNivel.nivel = nivel;
      this.modelNivel.golesXmes = golesPorMes;
      this.listaNiveles[this.countNiveles] = this.modelNivel;

      this.modelEquipo.equipo=this.nombreEquipo;
      this.modelEquipo.tipoNiveles=this.listaNiveles;
      this.listaEquipos[this.countEquipos] = this.modelEquipo;
      this.countEquipos=this.countEquipos+1;
      this.nombreEquipo = equipoNuevo;
    }
  }

}

export class ModelRequestSueldos{
  jugadores:Jugadores[];
  equipos:Equipos[];
}

export class Equipos{
  equipo:string;
  tipoNiveles:TipoNiveles[];
}

export class TipoNiveles{
  nivel:string;
  golesXmes:number;
}

export class Jugadores{  
  nombre:string;     
  nivel:string;  
  goles:number;  
  sueldo:number;  
  bono:number;  
  sueldo_completo:number;  
  equipo:string;
}
