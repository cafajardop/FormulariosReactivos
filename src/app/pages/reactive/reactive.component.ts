import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService ) { 
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }
  //array de pasatiempos
  get pasatiempos (){
    return this.forma.get('pasatiempos') as FormArray;
  } 


  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  // Validar contraseñas
  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }

  crearFormulario(){
    this.forma = 
    this.fb.group({
          nombre  :['', [Validators.required, Validators.minLength(5)]],
          apellido:['', [Validators.required, Validators.minLength(5), this.validadores.noFajardo]],
          correo  :['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
          usuario :['', '', ,this.validadores.existeUsuario],
          pass1   :['', Validators.required],
          pass2   :['', Validators.required],
          
          direccion: this.fb.group({
              distrito:['', Validators.required],
              ciudad:['', Validators.required],
          }),
          pasatiempos: this.fb.array([])
    }, 
    {
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  //Detectar si hubo cambios en las cajas de texto y cuando la forma sufra cualquier cambio
  crearListeners(){
    // this.forma.valueChanges.subscribe(valor =>{
    //   console.log(valor);
    // });

    // cambios de la forma
    // this.forma.statusChanges.subscribe(status => {
    //     console.log(status);
    // });
      
    // Si solo quiero saber el cambio de un campo y obtener en tipo real el cambio del campo 
    this.forma.get('nombre').valueChanges.subscribe(valor => {
      console.log(valor);      
    })
    
  }

  cargarDataAlFormulario(){
    // this.forma.setValue(
      this.forma.reset({
        nombre: 'Carlos',
        apellido: 'Pedraza',
        correo: 'carlos@hotmail.com',
        usuario:'',
        pass1:'123',
        pass2:'123',
        direccion: {
          distrito: 'Ontario',
          ciudad: 'Ottawa'
        }
      }
    )
  }
  // Agregar elemento dinamico utilizamos el meotdo pasatiempos
  agregarPasatiempo(){
    // this.pasatiempos.push(this.fb.control('', Validators.required));
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control =>{
        //Debemos evaluar si es un formgroup
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }        
      })
    }
    //Posteo de la información
    this.forma.reset();

  }
}
