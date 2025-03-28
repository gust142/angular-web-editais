import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Edital } from '../../models/edital';
import { Ong } from '../../models/ong';
@Component({
  selector: 'app-editais',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule],
  templateUrl: './editais.component.html',
  styleUrl: './editais.component.scss'
})
export class EditaisComponent {
  lista: Edital[] = []
  edital: any = undefined;
  constructor(private mainService: MainService, private router: Router) {
    this.mainService.listarEditais().subscribe(
      {
        next: (response: Edital[]) => {
          this.lista = response
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
  acessarEdital(item: any) {
    this.router.navigate(['/detalhes'], { state: { data: item } })
  }
  login() {
    this.router.navigate(['/login'])
  }
  voltar() {
    this.edital = undefined;
  }
}
