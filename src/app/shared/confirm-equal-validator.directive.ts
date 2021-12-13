import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';


@Directive({
  selector:'[appConfirmEqualValidator]',
  providers:[{
      provide:NG_VALIDATORS,
      useExisting:ConfirmequalValidatorDirective,
      multi:true
  }]
  })
  export class ConfirmequalValidatorDirective implements Validators{
    @Input()
    appConfirmEqualValidator!: string;
  validate(control:AbstractControl):{[key:string]:any} |null{
      const controlToCompare=control.parent.get(this.appConfirmEqualValidator);
      if (controlToCompare && controlToCompare.value!==control.value){
          return {'notEqual':true}
      }
  return null;
  }
  }