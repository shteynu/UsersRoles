import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  showPassword = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(
          '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}


  fieldHasError(fieldName: string): boolean {
    return this.fieldHasErrorr(fieldName, this.loginForm);
  }

  getErrorMessage(fieldName: string): string {
    return this.getErrorMessages(
      fieldName,
      this.loginForm
    );
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

  fieldHasErrorr(fieldName: string, targetForm: any): boolean {
    const formField = targetForm?.controls[fieldName];
    return !!(formField?.invalid && formField?.touched);
  }

  getErrorMessages(fieldName: string, targetForm: any): string {
    const formField = targetForm?.get(fieldName);
    const fieldErrors = targetForm?.controls[fieldName].errors;
    return formField?.hasError('required')
      ? 'Reuired field'
      :
      formField?.hasError('email')
        ? 'Username must be email'
        : formField?.hasError('minlength')
          ? `Input should contain at least
      ${this.getLengthError(fieldErrors.minlength)} characters`
          : formField?.hasError('maxlength')
            ? `Input should contain max
      ${this.getLengthError(fieldErrors.maxlength)} characters`
            : formField?.hasError('pattern')
              ? 'Password must contain one uppercase, one lowercase and one special characters of #?!@$%^&*-'
              : formField?.hasError('mismatch')
                ? 'Passwords mismatch'
                : 'Unknown error';
  }

  private getLengthError = (fieldError: any): string => {
    return `(${fieldError?.actualLength} / ${fieldError?.requiredLength})`;
  }
}
