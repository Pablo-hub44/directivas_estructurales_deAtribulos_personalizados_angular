import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
//asi seria una directiva estrucural
export class AuthDirective {

  userType = input.required<Permission>({alias: 'appAuth'})

  //inyectamos el authservice
  private authService = inject(AuthService);
  private templateRef =inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef)

  constructor() { 
    //para eschucar los signal, cmo hacer una subscripcion
    effect(()=>{
      //validamos si el rol existe 
      if (this.authService.activePermission() === this.userType()) {
        console.log("elemento a la vista");
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }else{
        console.log('elemento no a ala vista');
        this.viewContainerRef.clear()//removera cualquier 
        
      }
    })
  }

}
