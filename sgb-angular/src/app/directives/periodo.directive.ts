import { Directive, HostListener, Input } from "@angular/core";

import { 
    NG_VALUE_ACCESSOR, ControlValueAccessor 
  } from '@angular/forms';

@Directive({
    selector: '[periodoMask]'
})
export class PeriodoDirective implements ControlValueAccessor{

    onTouched : any = '';
    valorMask : string = '';

    @Input() periodoMask: string;

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
      var valor = $event.target.value;

      if ($event.keyCode === 8) {
        this.onChange("");
        return;
      }

      var patternPeriodo = /[a-zA-Z]/g;
      if(patternPeriodo.test(valor)){
        valor = "";
      }

      var pad = valor.replace(/^(\d{4,})(\d{1,})/g, 
            "$1.$2");

      this.valorMask = pad;

      $event.target.value = this.valorMask;
    }

    @HostListener('blur', ['$event'])
    onblur($event: any){
    }

    onChange(dados){
      this.valorMask = dados;
    }
}