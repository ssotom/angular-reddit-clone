import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Signup } from '../../shared/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: Signup;
  signupForm: FormGroup;

  formErrors = {
    'username': '',
    'email': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required':      'Username is required.',
      'maxlength':     'Username cannot be more than 40 characters long.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.',
      'maxlength':     'Email cannot be more than 40 characters long.'
    },
    'password': {
      'required':      'Password is required.',
      'maxlength':     'Password cannot be more than 40 characters long.'
    },
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { 
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(40)]],
    });

    this.signupForm.valueChanges
    .subscribe( () => this.onValueChanged());
  }

  onSubmit() {
    if(this.signupForm.valid) {
      this.signup = this.signupForm.value;
      this.authService.signup(this.signup).subscribe(
        response => console.log(response)
      );
    } else {
      this.onValueChanged(true);
    }
  }

  onValueChanged(isSend?:boolean) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;
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
