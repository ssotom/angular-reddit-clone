import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../shared/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest;
  loginForm: FormGroup;
  errorMessage: string;

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required':      'Username is required.',
    },
    'password': {
      'required':      'Password is required.',
    },
  };

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginForm.valueChanges
    .subscribe( () => this.onValueChanged());
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.loginRequest = this.loginForm.value;
      this.authService.login(this.loginRequest).subscribe(
        () => this.router.navigate(['/'])
      , error => this.errorMessage = error);
    } else {
      this.onValueChanged(true);
    }
  }

  onValueChanged(isSend?:boolean) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || isSend) && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
