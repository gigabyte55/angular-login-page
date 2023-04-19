import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  invalidEmailOrPassword: boolean = false;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      );
      if (this.loginService.isLoggedIn()) {
        this.router.navigate(['success-login']);
      } else {
        this.invalidEmailOrPassword = true;
      }
    }
  }
}
