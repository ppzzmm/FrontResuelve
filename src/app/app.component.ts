import { Component, OnInit } from '@angular/core';
import { SueldosService } from '../app/servicios/sueldos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ResuelveFCFront';

  // request
  modelRequestSueldos:ModelRequestSueldos;

  // response
  modelResponseSueldos:ModelResponseSueldos[];

  listaEquipos:Equipos[];
  listaNiveles:TipoNiveles[];
  modelJugador:Jugadores;
  listaJugadores:Jugadores[];

  nombreEquipo:string;

  countEquipos:number;

  constructor(
    private sueldosService:SueldosService
  ){}

  ngOnInit(){
    this.countEquipos = 0;
  }

  async calcularSueldos(){
    this.modelRequestSueldos = {jugadores:this.listaJugadores,equipos:this.listaEquipos};
    this.sueldosService.calcularSueldos(this.modelRequestSueldos).subscribe(
      data => {
        if(data){
          this.modelResponseSueldos = data;
          this.listaJugadores = null;
          this.listaEquipos = null;
          this.nombreEquipo = null; 
          this.countEquipos = 0;         
        }
      }
    )
  }

  agregaNivel(equipoNuevo:string,nivel:string,golesPorMes:number){   
    if(equipoNuevo != null && this.nombreEquipo != null &&  equipoNuevo == this.nombreEquipo
      && nivel != null && golesPorMes != null){
      this.buscarEquipo(equipoNuevo,nivel,golesPorMes);
    }
    if(equipoNuevo != null && this.nombreEquipo != null &&  equipoNuevo != this.nombreEquipo && this.listaEquipos != null
      && nivel != null && golesPorMes != null){
      let listN1:TipoNiveles[];
      listN1 = [{nivel:nivel,golesXmes:golesPorMes}];

      let nombreE:string = equipoNuevo;

      let listaE:Equipos = new Equipos;
      listaE.equipo=nombreE;
      listaE.tipoNiveles=listN1;
      this.listaEquipos[this.countEquipos] = listaE;

      this.countEquipos=this.countEquipos+1;
      this.nombreEquipo = equipoNuevo;
    }
    if(this.nombreEquipo == null && equipoNuevo != null 
      && nivel != null && golesPorMes != null ){
      this.nombreEquipo = equipoNuevo;
      let listN:TipoNiveles[];
      listN = [{nivel:nivel,golesXmes:golesPorMes}];
      this.listaNiveles= listN;

      let nombreE:string;
      nombreE = this.nombreEquipo;
      let listaE:Equipos[];
      listaE = [{equipo:nombreE,tipoNiveles:listN}];
      this.listaEquipos = listaE;
      this.countEquipos=this.countEquipos+1;
    }
    nivel="";
    golesPorMes=null;
  }

  agregarJugador(equipoJ:string,nombreJ:string,nivelJ:string,golesJ:number,sueldoJ:number,bonoJ:number){
    if(equipoJ != null && nombreJ != null && nivelJ != null && golesJ != null && sueldoJ != null && bonoJ != null){
      if(this.listaJugadores != null){
        this.buscarJugador(equipoJ,nombreJ,nivelJ,golesJ,sueldoJ,bonoJ);
      }else{
        let listaJ:Jugadores[];
        listaJ = [{nombre:nombreJ,nivel:nivelJ,goles:golesJ,sueldo:sueldoJ,bono:bonoJ,sueldo_completo:null,equipo:equipoJ}];
        this.listaJugadores = listaJ;
      }
    }
  }

  buscarJugador(equipoJ:string,nombreJ:string,nivelJ:string,golesJ:number,sueldoJ:number,bonoJ:number){  
    let count = 0;
    for(let e of this.listaJugadores){
      if(e.equipo == equipoJ && e.nombre == nombreJ){
        count=count+1;
      }
    }
    if(count == 0){
      let jugador:Jugadores;
      jugador = {nombre:nombreJ,nivel:nivelJ,goles:golesJ,sueldo:sueldoJ,bono:bonoJ,sueldo_completo:null,equipo:equipoJ};
      this.listaJugadores[this.listaJugadores.length] = jugador;
    }
  }

  buscarEquipo(nombreE:string,nivelE:string,golesPorMes:number){  
    let count = 0;
    for(let e of this.listaEquipos){
      if(e.equipo == nombreE && e.tipoNiveles != null){
        let listN = e.tipoNiveles;
        let countN = 0;
        for(let n of listN){
          if(n.nivel == nivelE){
            countN=countN+1;
          }
        }
        if(countN == 0){
          let modelNivel:TipoNiveles = new TipoNiveles;
          modelNivel.nivel = nivelE;
          modelNivel.golesXmes = golesPorMes;
          listN[listN.length] = modelNivel;
          this.listaEquipos[count].tipoNiveles = listN;
        }
        break;
      }
      count=count+1;
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

export class ModelResponseSueldos{
  nombre:string;   
  goles_minimos:number; 
  goles:number;  
  sueldo:number;  
  bono:number;  
  sueldo_completo:number;  
  equipo:string;
}
