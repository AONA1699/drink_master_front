import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { CajaService } from 'src/app/services/caja.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {

  cartItems: any[] = [];
  totalCartPrice: number = 0;
  enviroment = environment;
  success_load_pedido = false;

  constructor(
    public activeModal: NgbActiveModal,
    private cartService: CartService,
    private caja: CajaService
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
      // Actualizar la cantidad en el carrito
      this.cartService.updateQuantity(producto_id, quantity, false);
      
      // Buscar el producto en el carrito y actualizar 'cantidades_compradas'
      const productInCart = this.cartItems.find(item => item.producto_id === producto_id);
      if (productInCart) {
        productInCart.cantidades_compradas = quantity;
      }
      
      this.updateCartPrice(); // Recalcular el total
    }
  }


  proceedToCheckout() {
    
    this.caja.CAJA(this.cartItems, this.totalCartPrice).then( (data:any) => {
      let status = data.status;
      
      if(status == 201) { 
        this.success_load_pedido = true;
        setTimeout(() => {
          this.success_load_pedido = false;
          this.activeModal.close();
          this.cartService.clearCart();
        }, 4000);
        
      }
    })

  }
}
