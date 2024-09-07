import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LocalStorageUtil } from 'src/app/uitls/localstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private loginService: LoginService, 
    private fb: FormBuilder,
    private route: Router,
    private localstorage: LocalStorageUtil,
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usernameOrEmail, password } = this.loginForm.value;

      this.loginService.SIGN_IN(usernameOrEmail, password).then( (data:any) => {
        const status = data.status;

        if(status != 200) {
          this.errorMessage = 'Por favor, valide su usuario y contraseña'
        } else {
          const token = data.body.token;
          this.localstorage.save("token", token);
          this.route.navigate(["dashboard"])
        }



      })
    }
  }
}
