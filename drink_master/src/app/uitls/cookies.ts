import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root',
})

export class CookieUtil {

    pathDomain:any;
    constructor(@Inject(DOCUMENT) private document: Document) {
      this.pathDomain = window.location.hostname;
    }

    // Método para guardar una cookie
    save(nombre: string, valor: string, diasExpiracion: number) {
      const fechaExpiracion = new Date();
      fechaExpiracion.setDate(fechaExpiracion.getDate() + diasExpiracion);
  
      // Configura la cookie con el mismo dominio y ruta
      this.document.cookie = `${nombre}=${valor}; expires=${fechaExpiracion.toUTCString()}; domain=.${this.pathDomain}; path=/;`;
    }
  
    // Método para editar todas las cookies con el mismo nombre
    update(nombre: string, valor: string, diasExpiracion: number) {
      const fechaExpiracion = new Date();
      fechaExpiracion.setDate(fechaExpiracion.getDate() + diasExpiracion);
  
      // Obtiene todas las cookies con el mismo nombre
      const cookies = this.document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieNombre, _] = cookie.trim().split('=');
        if (cookieNombre === nombre) {
          // Edita cada cookie con el mismo nombre
          this.document.cookie = `${nombre}=${valor}; expires=${fechaExpiracion.toUTCString()}; domain=.${this.pathDomain}; path=/;`;
        }
      }
    }
  
    // Método para eliminar todas las cookies con el mismo nombre
    delete(nombre: string) {
      this.document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${this.pathDomain}; path=/;`;
      // Elimina la cookie en el dominio sin punto
      this.document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  
    // Método para obtener el valor de una cookie por nombre
    get(nombre: string): string {
        const cookies = this.document.cookie.split(';');
        for (const cookie of cookies) {
          const [cookieNombre, valor] = cookie.trim().split('=');
          if (cookieNombre === nombre) {
            return valor; // Devuelve el valor de la cookie si se encuentra
          }
        }
        return ''; // Devuelve una cadena vacía si la cookie no se encuentra
    }

     // Método para verificar si existe la cookie
    check(nombre: string): boolean {
        const cookies = this.document.cookie.split(';');
        for (const cookie of cookies) {
          const [cookieNombre, _] = cookie.trim().split('=');
          if (cookieNombre === nombre) {
            return true; // La cookie existe
          }
        }
        return false; // La cookie no existe
      }
  
    // Método privado para obtener el dominio actual sin subdominios

}