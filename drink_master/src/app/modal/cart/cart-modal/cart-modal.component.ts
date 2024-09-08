import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {

  cartItems: any[] = [];
  totalCartPrice: number = 0;
  enviroment = environment;

  constructor(
    public activeModal: NgbActiveModal,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.updateCartPrice();
  }

  // Actualizar el precio total del carrito
  updateCartPrice() {
    this.totalCartPrice = this.cartService.getTotalPrice();
  }

  // Eliminar un producto del carrito
  removeFromCart(producto_id: number) {
    this.cartService.removeFromCart(producto_id);
    this.cartItems = this.cartService.getCart(); // Actualizar los items del carrito
    this.updateCartPrice(); // Recalcular el total
  }

  // Cuando el usuario cambia la cantidad de un producto
  onQuantityChange(producto_id: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(producto_id, quantity, false);
      this.updateCartPrice(); // Recalcular el total
    }
  }
}
