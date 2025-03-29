import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Recurso } from '../../models/recurso';
import { TuiTextfield, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    TuiTextfield, TuiTextfieldComponent, TuiButton],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent {

  edital: any;
  form: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private router: Router, private location: Location, private formBuilder: FormBuilder, private mainService: MainService) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cargo: ['', Validators.required],
      assunto: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.edital = history.state.data;
  }
  voltar() {
    this.location.back();
  }
  submitForm() {
    if (!this.form.valid) {
      this.openSnackBar('Preencha os campos em branco', 'Fechar')
    } else {
      var resurso: Recurso = {
        nome: this.form?.get('nome')?.value || '',
        email: this.form?.get('email')?.value || '',
        cargo: this.form?.get('cargo')?.value || '',
        assunto: this.form?.get('assunto')?.value || '',
        editalId: this.edital.id
      }
      this.mainService.criarRecurso(resurso).subscribe({
        next: (response) => {
          this.form.reset();
          this.openSnackBar('Formulário enviado com sucesso', 'Fechar');
          this.voltar();
        },
        error: (error) => {
          this.openSnackBar(error.error.message, 'Fechar');
        }
      })
    }
  }
  login() {

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
}
