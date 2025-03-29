import { CommonModule } from '@angular/common';
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
import { TuiTextfield, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    TuiTextfield, TuiTextfieldComponent, TuiButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private router: Router, private formBuilder: FormBuilder, private mainService: MainService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  voltar() {
    this.router.navigate(['/editais'])
  }
  ngOnInit() {
    if (localStorage.getItem("token") != undefined) {
      this.router.navigate(['/admin'])
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
  login() {
    console.log(this.loginForm.valid)
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.mainService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem("token", response.access_token)
          this.router.navigate(['/admin'])
        },
        error: (error) => {
          console.log(error);

          this.openSnackBar('Email e/ou senha incorretos', 'Fechar')
        }
      })
    }
  }
}
