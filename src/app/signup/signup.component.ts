import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountService} from "../counter/count.service";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorListener;
  state = '';
  error: any;
  signUpForm: FormGroup;
  emailMessage: string;
  passwordMessage: string;
  fireUserFound = 'The email address is already in use by another account.';
  notFound = false;
  emailUserExist = 'Этот адрес уже используется';
  private validationMessages = {
    required: 'This field is required.',
    minlength: 'Must be longer than 6 characters.',
    email: 'Please enter a valid email address.'
  };

  constructor(public _af: AngularFireAuth,
              public router: Router, private _authServ: AuthService,
              private _fb: FormBuilder,
              private _cServ: CountService,) {
  }
  onSubmit(formData) {
    if (formData.valid) {
      this._authServ.emailSignUp(formData.value.email,
        formData.value.password)
        .then(
          res => {
            this.router.navigateByUrl('/members');
          })
        // .catch(err => console.log(err + '!!!!!!'))
        .catch(err => {
          if (err.message.includes(this.fireUserFound)) {
            this.notFound = true;
          }
        }
      );
    }
    // console.log(' error ' + this._authServ.signUpError);
    if (this._authServ.signUpError.includes(this.fireUserFound)) {
      this.notFound = true;
    }

 /*   if (!this.notFound) {
      this._cServ.updateUsersCounter();
    }*/

  }


/*  onSubmit(formData) {
    if (formData.valid) {
      this._authServ.emailSignUp(formData.value.email,
        formData.value.password)
        .then(
          res => {
            this.router.navigateByUrl('/members');
          }).catch(err => {
          if (this._authServ.signUpError.includes(this.fireUserFound)) {
            console.log(err.message);
            this.notFound = true;
          }
        }
      );
    }
    console.log(' eeeee ' + this._authServ.signUpError);
    if (this._authServ.signUpError.includes(this.fireUserFound)) {
      this.notFound = true;
    }
    if (!this.notFound) {
      this._cServ.updateUsersCounter();
    }

  }*/

  /*  onSubmit(formData) {
   if (formData.valid) {
   this._af.auth.createUserWithEmailAndPassword(formData.value.email,
   formData.value.password)
   .then(
   res => {
   this.router.navigateByUrl('/members');
   }).catch(err => {
   if(err.message.includes(this.fireUserFound)){
   // console.log('eeeee');
   console.log(err.message);
   this.notFound = true;
   }
   }
   );
   }

   if(this.notFound){ this._cServ.updateUsersCounter();}

   }*/
  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    const emailControl = this.signUpForm.get('email');
    emailControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setEmailMessage(emailControl)
    );
    const passwordControl = this.signUpForm.get('password');
    passwordControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setPasswordMessage(passwordControl)
    );
    this.afterCheck();

  }
 afterCheck(){
/*    this._authServ.error$.subscribe(
      err => this.errorListener = err
    );
   console.log(this.errorListener + ' ERRORList')*/
 }
  setEmailMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setPasswordMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }


}
