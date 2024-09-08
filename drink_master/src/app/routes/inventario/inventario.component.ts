import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsermeService } from 'src/app/services/userme';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  username: string | null = '';

  constructor(
    private router: Router,
    private userme: UsermeService,
  ) { }

  ngOnInit(): void {
    this.loadUserMe()
  }

  loadUserMe() {
    this.userme.gerUserMe().then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.username = data.body.username;
      }
    });
  }

  logout() {
    localStorage.removeItem('token');  // Eliminar el token del LocalStorage
    localStorage.removeItem('username');  // Eliminar el nombre de usuario
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
