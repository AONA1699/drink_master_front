import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsermeService } from 'src/app/services/userme';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit, OnDestroy  {

  username: any;
  pedidos_all: any = [];
  detallesPedido: any[] = [];
  previousPedidos: any[] = [];
  load_table = false;
  pollingInterval: any; 

  @ViewChild('detallesModal', { static: true }) detallesModal: any;
  
  constructor(
    private router: Router,
    private userme: UsermeService,
    private pedidos: PedidosService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.pollingInterval = setInterval(() => {
      this.loadPedidos(); // Polling cada 5 segundos
    }, 5000);
    this.loadUserMe();
  }

  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);  // Detener el intervalo
    }
  }

  logout() {
    localStorage.removeItem('token');  // Eliminar el token del LocalStorage
    localStorage.removeItem('username');  // Eliminar el nombre de usuario
    this.router.navigate(['/login']);  // Redirigir al login
  }

  loadPedidos() {
    this.pedidos.getPedidos().then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.load_table = true;
        const nuevosPedidos = data.body;
  
        // Verificar si hay pedidos nuevos
        if (nuevosPedidos.length > 0 && JSON.stringify(nuevosPedidos) !== JSON.stringify(this.previousPedidos)) {
          // Resaltar el primer pedido solo si hay cambios
          this.pedidos_all = nuevosPedidos.map((pedido: any, index: number) => ({
            ...pedido,
            isNew: index === 0 // Solo el primer pedido tiene isNew: true
          }));
  
          // Resaltar el primer nuevo pedido por 10 segundos
          setTimeout(() => {
            this.pedidos_all[0].isNew = false; // Solo remover la clase del primer pedido
          }, 10000);
  
          // Actualizar el historial de pedidos anteriores
          this.previousPedidos = [...nuevosPedidos];
        }
      }
    });
  }
  

  verDetalles(pedido: any) {
    // Decodificar el JSON de los productos en el pedido
    this.detallesPedido = JSON.parse(pedido.pedidos);

    // Abrir el modal para mostrar los detalles
    this.modalService.open(this.detallesModal, { size: 'lg' });
  }

  loadUserMe() {
    this.userme.gerUserMe().then((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.username = data.body;
      }
    });
  }

}
