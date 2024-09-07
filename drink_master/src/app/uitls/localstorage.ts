import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageUtil {

    constructor(@Inject(DOCUMENT) private document: Document) {}

    // Método para guardar variable en localstorage
    save(clave: string, valor: string): void {
        localStorage.setItem(clave, valor);
    }
  
    // Método para eliminar variable en localstorage
    delete(clave: string): void {
        localStorage.removeItem(clave);
    }
  
    // Método para obtener el valor de una variable en localstorage
    get(clave: string): string | null {
        return localStorage.getItem(clave);
    }

     // Método para verificar si existe la cookie
    check(clave: string): boolean {
        return localStorage.getItem(clave) !== null;
    }

}