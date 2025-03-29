import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Edital } from '../../models/edital';
import { Ong } from '../../models/ong';
import { Link } from '../../models/link';
import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiStringHandler } from '@taiga-ui/cdk/types';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatButtonModule, FormsModule,
    MatCardModule, MatToolbarModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTabsModule,
    MatExpansionModule, MatSelectModule, MatSlideToggleModule, TuiDataList, TuiDataListWrapper, TuiSelectModule,
    TuiTextfieldControllerModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  protected stringify: TuiStringHandler<Ong> = (item) => item.nome ?? '';
  form: FormGroup;
  private _snackBar = inject(MatSnackBar);
  years: Number[] = [2022, 2023, 2024, 2025]
  processos: Ong[] = []
  editais: Edital[] = []
  anoSelecionado: any;
  processoSelecionado: Ong = { id: "0" }
  criaEdital = false;
  criaRecurso = false;
  editaisLinks: Edital[] = []
  editalSelecionado: Edital = {
    id: "0",
    ong: { id: "0" }
  };

  constructor(private router: Router, private location: Location, private formBuilder: FormBuilder, private mainService: MainService) {
    this.form = this.formBuilder.group({
      ano: ['', [Validators.required]],
      processo: ['', [Validators.required]]
    });

  }
  ngOnInit() {
    if (localStorage.getItem("token") == undefined) {
      this.router.navigate(['/login'])
    }
    this.mainService.listarProcessosSeletivos().subscribe({
      next: (response: Ong[]) => {
        this.processos = response
      }
    })
    this.listarEditais();
  }
  login() {

  }
  irParaEditais() {
    this.router.navigate(['/editais'])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  criarEdital() {
    const { ano, processo } = this.form.value;
    this.anoSelecionado = ano;
    this.processoSelecionado = processo;
    if (!this.editais.find(item => { return item.id == "0" })) {
      this.editais.push({
        id: "0",
        descricao: '',
        ano: this.anoSelecionado,
        aberto: false,
        ong: {
          id: this.processoSelecionado.id
        }

      })
    }
  }
  buscarEditais() {
    if (this.form.valid) {
      const { ano, processo } = this.form.value;
      this.anoSelecionado = ano;
      this.processoSelecionado = processo;
      this.mainService.liestarEditaisPorAno(this.anoSelecionado, Number.parseInt(this.processoSelecionado.id)).subscribe({
        next: (response) => {
          this.editais = response
        }
      })
    }
  }
  save() {

  }

  onYearChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.anoSelecionado = Number.parseInt(selectElement.value);
  }
  onOngChange(selectedOng: Ong) {
    console.log('ONG selecionada:', selectedOng);
    this.criaEdital = true;
    this.processoSelecionado = selectedOng;
  }

  salvarOuAtualizarEdital(edital: any) {
    edital.numero = Number.parseInt(edital.numero);
    edital.ano = Number.parseInt(edital.ano);
    if (edital.id == 0) {
      this.mainService.criarEdital(edital).subscribe({
        next: (response) => {
          this.openSnackBar(response.message, 'Fechar')
          this.buscarEditais();
        },
        error: (error) => {
          console.log(error);
          this.openSnackBar(error, 'Fechar')
        }
      })
    } else {
      this.mainService.atualizarEdital(edital).subscribe({
        next: (response) => {
          this.openSnackBar(response.message, 'Fechar')
          this.buscarEditais();
        },
        error: (error) => {
          console.log(error);
          this.openSnackBar(error, 'Fechar')
        }
      })
    }
  }

  onEditalChange(selectedEdital: Edital) {
    console.log('Edital selecionado:', selectedEdital);
    this.criaRecurso = true;
    this.editalSelecionado = selectedEdital;
  }
  listarEditais() {
    this.mainService.listarEditais().subscribe({
      next: (response: Edital[]) => {
        this.editaisLinks = response
      }
    })
  }

  salvarOuAtualizarLink(link: Link) {
    if (link.id == "0") {
      this.mainService.criarLink(link).subscribe({
        next: (response) => {
          this.openSnackBar(response.message, 'Fechar')
          this.listarEditais();
          this.editalSelecionado = {
            id: "0",
            ong: { id: "0" }
          }
        },
        error: (error) => {
          console.log(error);
          this.openSnackBar(error, 'Fechar')
        }
      })
    } else {
      this.mainService.atualizarLink(link).subscribe({
        next: (response) => {
          this.openSnackBar(response.message, 'Fechar')
          this.listarEditais();
          this.editalSelecionado = {
            id: "0",
            ong: { id: "0" }
          }
        },
        error: (error) => {
          console.log(error);
          this.openSnackBar(error, 'Fechar')
        }
      })
    }
  }

  criarLink() {
    if (!this.editalSelecionado.links?.find(item => { return item.id == "0" })) {
      this.editalSelecionado.links?.push({
        id: "0",
        nome: "Novo Link",
        url: "",
        editalId: Number.parseInt(this.editalSelecionado.id)
      })
    }
  }

}
