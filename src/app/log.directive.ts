import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true
})
export class LogDirective {

  private elementRef = inject(ElementRef);



  constructor() { }


  /**
   * metodo para el log
   */
  @HostListener('click') // Escucha el evento click
  onLog(){
    console.log('clicked');
    console.log(this.elementRef.nativeElement);
    
    
  }
}
