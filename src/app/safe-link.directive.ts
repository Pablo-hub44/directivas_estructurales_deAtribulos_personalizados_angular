//creando una directiva personalizada
import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

//asi seria una directiiva de atributos
@Directive({
    selector: 'a[appSafeLink]',//como le pusimos esa a , le podremos aplicar nuestra directiva a todas las etiquetas 'a'
    standalone: true,
    host: {//mandamos al evento click para que haga la funcion que pasemos
        '(click)': 'onConfirmLeavePage($event)'
    },
    hostDirectives: [LogDirective],//poniendole otra directiva
})
/**
 * 
 */
export class SafeLinkDirective {

    //el que pasaremos por parametro, para asignarlo a la url
    queryParam = input('myapp');//se le puede poner alias tambien {alias: 'appSafeLink'}

    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
    console.log("el safe link directive esta activo");
    }

    /**
     * 
     * @param event 
     * @returns 
     */
    onConfirmLeavePage(event: MouseEvent) {
        const confirmacion = window.confirm('Seguro que quieres salir de la app?');

        if (confirmacion) {
            const address = this.hostElementRef.nativeElement.href;// (event.target as HTMLAnchorElement).href;
            
            (event.target as HTMLAnchorElement).href = address + '?from='+this.queryParam;
            return;
        }

        event.preventDefault();
    }
}


//casi no se crean directivas personalizadas mas se usara componentes