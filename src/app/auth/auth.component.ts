import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { UserAccount } from '../profile/models/User.model';
import { UserService } from '../profile/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnDestroy {
  @Output() closeComponenet = new EventEmitter<boolean>();
  @Input() isLogin: boolean = true;
  errorSubscription: Subscription;

  isUserLoggedIn = false;
  accountCreated: boolean = false;
  passwordHidden: boolean = true;
  error: string;

  showPasswordIcon = `<i class="fa-regular fa-eye"></i>`;
  hidePasswordIcon = `<i class="fa-regular fa-eye-slash"></i>`;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  loginForm = this._formBuilder.group({
    email: [
      '',
      {
        validators: [Validators.email, Validators.required],
      },
    ],
    password: ['', Validators.required],
  });

  createAccountForm = this._formBuilder.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: this._emailValidatorIfExistsOrNot(),
        updateOn: 'blur',
      },
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  createProfileForm = this._formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    username: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required]),
  });

  onLogin() {
    let loginData: any = this.loginForm.value;
    this._userService.loginUser({ ...loginData });
    this.errorSubscription = this._userService.errorHappened.subscribe(
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
  }

  onCreateAccount() {
    let accountData: any = this.createAccountForm.value;
    this._userService.createAccount({ ...accountData });
    this.accountCreated = true;
  }

  onCreateProfile() {
    let profileData: any = this.createProfileForm.value;
    this._userService.createProfile(
      profileData.username,
      profileData.name,
      profileData.date,
      this.createAccountForm.value as any
    );
  }

  onChangeAuthType() {
    this.isLogin = !this.isLogin;
  }

  // to get the form controls for validation purposes
  get loginFormData(): any {
    return this.loginForm['controls'];
  }

  onCloseAuth() {
    this.closeComponenet.emit(true);
  }

  togglePasswordVisibilty() {
    this.passwordHidden = !this.passwordHidden;
  }

  // Async validator for email
  private _emailValidatorIfExistsOrNot(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return this._userService.isEmailFound(control.value).pipe(
        map((response) => {
          return response.registered ? { userExists: true } : null;
        })
      );
    };
  }
}
