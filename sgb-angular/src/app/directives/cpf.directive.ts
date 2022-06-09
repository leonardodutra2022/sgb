import { Directive, HostListener, Input } from "@angular/core";

import { 
    NG_VALUE_ACCESSOR, ControlValueAccessor 
  } from '@angular/forms';

@Directive({
    selector: '[cpfMask]'
})
export class CpfDirective implements ControlValueAccessor{

    onTouched : any = '';
    valorMask : string = '';

    @Input() cpfMask: string;

    writeValue(value: any): void {
    }
   
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    registerOnChange(fn : any) : void {

    }

    @HostListener('keyup', ['$event'])
    onkeyup($event: any){
      var valor : string = $event.target.value;

      if ($event.keyCode === 8) {
        return;
      }

      var patternCpf = /[^0-9]/g;
      if(patternCpf.test(valor) && valor.length < 11){
        this.valorMask = '';
        valor = '';
      }else{
        this.valorMask = valor;
      }

      var pad = valor.replace(/^(\d{3,})(\d{3,})(\d{3,})(\d{2})/g, 
            "$1.$2.$3-$4");

      if($event.keyCode === 190){
        // this.valorMask = "";
      }else{
        this.valorMask = pad;
      }
      $event.target.value = this.valorMask;
    }

    @HostListener('blur', ['$event'])
    onblur($event: any){
      var valor : string = $event.target.value;

      var patternCpf = /[^0-9]/g;
      if(patternCpf.test(valor) && valor.length < 11){
        this.valorMask = '';
        valor = '';
      }else{
        this.valorMask = valor;
      }

      var pad = valor.replace(/^(\d{3,})(\d{3,})(\d{3,})(\d{2})/g, 
            "$1.$2.$3-$4");

      this.valorMask = pad;

      $event.target.value = this.valorMask;
    }
}