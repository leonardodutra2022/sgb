import { Directive, HostListener, Input } from "@angular/core";

import { 
    NG_VALUE_ACCESSOR, ControlValueAccessor 
  } from '@angular/forms';

@Directive({
    selector: '[cepMask]'
})
export class CepDirective implements ControlValueAccessor{

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

      var patternCpf = /[a-zA-Z]/g;
      if(patternCpf.test(valor)){
        valor = "";
      }

      var pad = valor.replace(/^(\d{2})(\d{3})(\d{3})/g, 
            "$1.$2-$3");

      this.valorMask = pad;

      $event.target.value = this.valorMask;
    }

    @HostListener('blur', ['$event'])
    onblur($event: any){
      this.valorMask = $event;
    }

    onChange(dados){
      this.valorMask = dados;
    }

}