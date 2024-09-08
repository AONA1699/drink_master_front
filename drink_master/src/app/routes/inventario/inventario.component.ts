import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { UsermeService } from 'src/app/services/userme';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent implements OnInit {
  username: any;
  p_bebidas: any[] = [];
  p_cervezas: any[] = [];
  p_cocteles: any[] = [];
  p_licores: any[] = [];

  constructor(
    private router: Router,
    private userme: UsermeService,
    private productService: ProductService,
    private stock: StockService
  ) {}

  ngOnInit(): void {
    this.loadUserMe();
    this.loadProducts_bebidas();
    this.loadProducts_cervezas();
    this.loadProducts_cocteles();
    this.loadProducts_licores();
  }

  upStockProduct(product: any){
    const cantidadAgregar = product.cantidad_a_agregar;

    if (cantidadAgregar > 0) {
      this.stock.stock(product.producto_id, cantidadAgregar).then((response: any) => {
        this.loadsAll();
      });
    } 
  }

  loadsAll(){
    this.p_bebidas = [];
    this.p_cervezas = [];
    this.p_cocteles = [];
    this.p_licores = [];

    this.loadProducts_bebidas();
    this.loadProducts_cervezas();
    this.loadProducts_cocteles();
    this.loadProducts_licores();
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

  loadUserMe() {
    this.userme.gerUserMe().then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.username = data.body;
      }
    });
  }

  logout() {
    localStorage.removeItem('token'); // Eliminar el token del LocalStorage
    localStorage.removeItem('username'); // Eliminar el nombre de usuario
    this.router.navigate(['/login']); // Redirigir al login
  }
}
