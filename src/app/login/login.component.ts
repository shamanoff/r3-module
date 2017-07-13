import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // state = '';
  error: any;
  notFound = false;
  invalid = false;
  fireUserNotFound = 'There is no user record corresponding to this identifier. The user may have been deleted.';
  firePasswordIncorect = 'The password is invalid or the user does not have a password.';
  emailUserNotFound = 'Email not found';
  passwordInvalid = 'Password is invalid';

  loginForm: FormGroup;
  emailMessage: string;
  passwordMessage: string;

  private validationMessages = {
    required: 'This field is required.',
    minlength: 'Must be longer than 6 characters.',
    email: 'Please enter a valid email address.',

  };

  constructor(
    public _af: AngularFireAuth,
    private router: Router,
    private _authServ: AuthService,
    private _fb: FormBuilder) {
    this._af.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/members']);
      }
    });
  }

  onSubmit(formData) {
    // form is valid
    if (formData.valid) {
      // response is valid
      this._authServ.emailLogin(formData.value.email,
        formData.value.password)
       .then(
         (user) => {
           this._authServ.authState.set(user);

       }).catch(err => {
         if(err.message === this.fireUserNotFound){
           this.notFound = true;
         }
         if(err.message === this.firePasswordIncorect){
           this.invalid = true;
         }

       }

       );
    }
  }



  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    const emailControl = this.loginForm.get('email');
    emailControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setEmailMsg(emailControl)
    );
    const passwordControl = this.loginForm.get('password');
    passwordControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setPasswordMsg(passwordControl)
    );
  }


  setEmailMsg(c: AbstractControl): void {
    this.notFound = false;
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setPasswordMsg(c: AbstractControl): void {
    this.invalid = false;
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

}
