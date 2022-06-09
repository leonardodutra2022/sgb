import { Directive, HostListener, Input } from "@angular/core";

import { 
    NG_VALUE_ACCESSOR, ControlValueAccessor 
  } from '@angular/forms';

@Directive({
    selector: '[cpfAcadMask]'
})
export class CpfAcadDirective implements ControlValueAccessor{

    onTouched : any = '';
    valorMask : string = '';

    @Input() cpfMask: string;

    writeValue(value: any): void {
    }
   
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
   
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    @HostListener('keyup', ['$event'])
    onkeyup($event: any){
      var valor : string = $event.target.value;

      if ($event.keyCode === 8) {
        this.onChange("");
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

      var pad = valor.replace(/^(\d{3,})(\d{3,})(\d{3,})(\d{2})/g, 
            "$1.$2.$3-$4");

      var patternCpf = /[^0-9]/g;
      if(patternCpf.test(valor) && valor.length < 11){
        this.valorMask = '';
        valor = '';
      }else{
        this.valorMask = valor;
      }

      this.valorMask = pad;

      $event.target.value = this.valorMask;
    }

    onChange(dados){
      this.valorMask = dados;
    }

}