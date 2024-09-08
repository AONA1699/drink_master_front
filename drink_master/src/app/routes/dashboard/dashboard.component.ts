import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UsermeService } from 'src/app/services/userme';
import { LocalStorageUtil } from 'src/app/uitls/localstorage';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartModalComponent } from 'src/app/modal/cart/cart-modal/cart-modal.component';
import { CartService } from 'src/app/services/cart';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  p_bebidas: any[] = [];
  p_cervezas: any[] = [];
  p_cocteles: any[] = [];
  p_licores: any[] = [];
  username: any;
  enviroment = environment;
  totalItems: number = 0;
  private cartSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private userme: UsermeService,
    private localstorage: LocalStorageUtil,
    private cartService: CartService,
    private modalService: NgbModal,
    private router: Router,
    private viewportScroller: ViewportScroller,
    
  ) {}

  
  scrollTo(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }
  ngOnInit(): void {
    const is_token = this.localstorage.get("token");

    if (is_token) {
      this.loadProducts_bebidas();
      this.loadProducts_cervezas();
      this.loadProducts_cocteles();
      this.loadProducts_licores();
      this.loadUserMe();
    } else {
      this.router.navigate(["/login"]);
    }

    this.updateCartItemCount();

    // Suscribirse a las actualizaciones del carrito
    this.cartSubscription = this.cartService.cartUpdated$.subscribe(
      (totalItems: number) => {
        this.totalItems = totalItems; // Actualizar el total de items cuando se modifique el carrito
      }
    );
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción cuando el componente se destruya
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  loadUserMe() {
    this.userme.gerUserMe().then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.username = data.body;
      }
    });
  }

  loadProducts_bebidas() {
    this.productService.getProducts('1').then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.p_bebidas = data.body;
      }
    });
  }

  loadProducts_cocteles() {
    this.productService.getProducts('3').then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.p_cocteles = data.body;
      }
    });
  }

  loadProducts_licores() {
    this.productService.getProducts('4').then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.p_licores = data.body;
      }
    });
  }

  loadProducts_cervezas() {
    this.productService.getProducts('2').then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.p_cervezas = data.body;
      }
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.updateCartItemCount(); // Actualiza el número de items después de agregar al carrito
  }

  updateCartItemCount() {
    this.totalItems = this.cartService.getTotalItems();
  }

  openCart() {
    this.modalService.open(CartModalComponent, { size: 'lg' });
  }

  logout() {
    localStorage.removeItem('token');  // Eliminar el token del LocalStorage
    localStorage.removeItem('username');  // Eliminar el nombre de usuario
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
