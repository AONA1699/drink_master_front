import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartUpdated = new Subject<number>();
  cartUpdated$ = this.cartUpdated.asObservable();

  constructor() { }

  private notifyCartUpdate() {
    this.cartUpdated.next(this.getTotalItems());
  }

  // Eliminar un producto del carrito usando producto_id
  removeFromCart(producto_id: number) {
    // Filtrar el carrito para que solo queden los productos que NO tienen el producto_id especificado
    this.cart = this.cart.filter(item => item.producto_id !== producto_id);
    this.notifyCartUpdate();
    console.log('Producto eliminado. Carrito actualizado:', this.cart);
  }

  // Agregar producto al carrito
  addToCart(product: any) {
    console.log(product);
  
    // Verificar si el producto tiene un campo 'producto_id'. Si no tiene, lanzar un error
    if (!product.producto_id) {
      console.error('El producto no tiene un id. Asegúrate de que todos los productos tienen un producto_id único.');
      return;
    }
  
    // Verificar si el producto ya existe en el carrito
    const existingProduct = this.cart.find(item => item.producto_id === product.producto_id);
  
    if (existingProduct) {
      console.log('El producto ya está en el carrito.');
    } else {
      // Si no existe, agregar el producto con una cantidad inicial de 1
      this.cart.push({ ...product, quantity: 1 });
      console.log('Producto agregado al carrito:', this.cart);
    }
  }

  // Obtener el carrito completo
  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.notifyCartUpdate();
  }
  // Modificar la cantidad de un producto en el carrito
  updateQuantity(producto_id: number, quantity: number, notify : boolean) {
    const existingProduct = this.cart.find((item) => item.producto_id === producto_id);
    if (existingProduct) {
      existingProduct.quantity = quantity;
    }

    if(notify){
      this.notifyCartUpdate();
    }
  }

  // Obtener la cantidad total de items en el carrito
  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtener el monto total del carrito
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.precio_producto * item.quantity), 0);
  }
}
