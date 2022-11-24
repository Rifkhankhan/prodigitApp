import { Directive } from "@angular/core";

@Directive({
  selector:'[appForm]',
  exportAs:'appForm'
})

export class FormDirective{
  constructor(){}
}
