import { Directive, HostListener, Input } from "@angular/core";

import { 
    NG_VALUE_ACCESSOR, ControlValueAccessor 
  } from '@angular/forms';

@Directive({
    selector: '[phoneMask]'
})
export class PhoneDirective implements ControlValueAccessor{

    onTouched : any = '';
    valorMask : string = '';

    @Input() phoneMask: string;

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
      this.changeInput($event);
    }

    @HostListener('blur', ['$event'])
    onblur($event: any){
      this.changeInput($event);
    }

    onChange(dados){
      this.valorMask = dados;
    }

    changeInput($event){
      var valor : string = $event.target.value;

      if ($event.keyCode === 8) {
        this.onChange("");
        return;
      }

      var patternCpf = /[a-zA-Z]/g;
      if(patternCpf.test(valor)){
        valor = "";
      }

      var pad = valor.replace(/^(\d{2})(\d{4})(\d{4})/g, 
            "($1) $2-$3");

      this.valorMask = pad;

      $event.target.value = this.valorMask;
    }
}