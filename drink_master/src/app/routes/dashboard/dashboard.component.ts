import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UsermeService } from 'src/app/services/userme';
import { LocalStorageUtil } from 'src/app/uitls/localstorage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  username: string | null = '';
  enviroment = environment;

  constructor(
    private productService: ProductService,
    private userme: UsermeService,
    private localstorage: LocalStorageUtil,
    private router: Router
  ) {}

  ngOnInit(): void {
    const is_token = this.localstorage.get("token");

    if(is_token){
      this.loadProducts();
      this.loadUserMe();
    } else {
      this.router.navigate(["/login"])
    }
    
  }

  loadUserMe(){
    this.userme.gerUserMe().then( (data:any) => {
      const status = data.status;
      if(status === 200){
        this.username = data.body.username
      }
    })
  }

  loadProducts() {
    this.productService.getProducts().then( (data:any) => {
      const status = data.status;
      if(status === 200){
        this.products = data.body;
      }
    })
  }

  logout() {
    localStorage.removeItem('token');  // Eliminar el token del localStorage
    localStorage.removeItem('username');  // Eliminar el nombre de usuario
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
