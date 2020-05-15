import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre:'Carlos',
    apellido:'Fajardo',
    correo:'carlosafp84@hotmail.com',
    pais:'COL',
    genero:'M'
  }

  paises: any[]=[];
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
    .subscribe( paises =>{
      this.paises = paises;

      this.paises.unshift({
        nombre:'[ Seleccion Pais ]',
        codigo:''
      })

      console.log(this.paises);
      
    });
  }
  guardar(forma: NgForm){
    console.log('Submit Disparado');
    console.log(forma.value);
    
    if(forma.invalid){
      //con object extraemos los campos que tenga la forma
      Object.values(forma.controls).forEach( control =>{
        control.markAllAsTouched();
      })

      return;
    }
    
  }

}
