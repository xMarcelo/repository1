import {Directive} from '@angular/core';
import { NgControl } from '@angular/forms';
// import {NgControl} from "@angular/forms";


@Directive({
    selector: '[appUpperCase]',    
    // tslint:disable-next-line:use-host-property-decorator
    host: {
      '(input)': 'onInputChange()'
    }
})

export class UppercaseDirective  {

    constructor( private ctrl: NgControl ) {}

    public onInputChange() {
        const newValue = this.ctrl.value.toUpperCase();
        this.ctrl.reset(newValue);
    }

}

