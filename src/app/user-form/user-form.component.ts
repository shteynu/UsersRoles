import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Profile} from '../models/auth-data';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ValidationService} from '../services/validation.service';
import {DataExchangeServiceService} from '../services/data-exchange-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {

  @Input() userData!: Profile;
  readonly userRoles = [
    { val: 1, viewVal: 'Customer' },
    { val: 2, viewVal: 'Admin' },
    { val: 3, viewVal: 'Super Admin' },
  ];
  currentUser: Profile | null = this.dataExchangeService.currentUser$.getValue();

  showPassword = false;

  userForm: FormGroup = new FormGroup({});
  constructor(
    private formValidationService: ValidationService,
    private dataExchangeService: DataExchangeServiceService
  ) {

  }

  ngOnInit(): void {
    this.userForm = this.initUserForm;
  }

  get getFormData() {
    return { ...this.userForm.value, role: this.userForm.value?.role || 1 };
  }

  private get initUserForm() {
    const passwordValidator = [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern(
        '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ];
    const passwordConfirmValidator = [
      ...passwordValidator,
      this.passwordMatchValidator(),
    ];

    return new FormGroup(
      {
        fullName: new FormControl(this.userData?.fullName || '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
        email: new FormControl(
          {
            value: this.userData?.email || '',
            disabled: this.userData ? true : false,
          },
          [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(30),
          ]
        ),
        role: new FormControl(this.userData?.role || '', []),
        password: new FormControl('', this.userData ? [] : passwordValidator),
        passwordConfirm: new FormControl(
          '',
          this.userData ? [] : passwordConfirmValidator
        ),
      }
    );
  }

  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.userForm);
  }

  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(fieldName, this.userForm);
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordVal = this.userForm?.get('password')?.value;
      const forbidden = control.value !== passwordVal;
      return forbidden ? { mismatch: true } : null;
    };
  }
}
