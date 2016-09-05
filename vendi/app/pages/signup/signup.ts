import {Component} from '@angular/core';
import {Control, AbstractControl} from '@angular/common';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {NavController, ViewController} from 'ionic-angular';
import {Http} from '@angular/http';
import {CirclesPage} from '../circles/circles';
import {FundingInfoPage} from '../fundinginfo/fundinginfo';
import {User} from '../../models/user';
import {AuthService} from '../../services/authservice';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {

  private signupFormCtrl : ControlGroup;
  private firstNameCtrl : AbstractControl;
  private lastNameCtrl : AbstractControl;
  private phoneCtrl : AbstractControl;
  private emailCtrl : AbstractControl;
  private passwordCtrl : AbstractControl;
  private confirmPasswordCtrl : AbstractControl;

  private user = new User();
  private authService;

  constructor(private navController: NavController,
    private view: ViewController, private http:Http, private formBuilder: FormBuilder) {
      this.authService = new AuthService(http);

      this.signupFormCtrl = formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(12)])],
        confirmPassword: ['', Validators.required]
      }, {validator: this.  matchingPasswords('password', 'confirmPassword')});

      this.firstNameCtrl = this.signupFormCtrl.controls['firstName'];
      this.lastNameCtrl = this.signupFormCtrl.controls['lastName'];
      this.phoneCtrl = this.signupFormCtrl.controls['phone'];
      this.emailCtrl = this.signupFormCtrl.controls['email'];
      this.passwordCtrl = this.signupFormCtrl.controls['password'];
      this.confirmPasswordCtrl = this.signupFormCtrl.controls['confirmPassword'];
    }

  signup() {
    this.authService.signup(this.user).subscribe(
      data => {
        if(data) {
          this.navController.push(FundingInfoPage);
        }
      },
      err => console.error(err)
    );
  }

  matchingPasswords(passwordKey : string, confirmPasswordKey : string) {
    return (group: ControlGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if(password.value !== confirmPassword.value) {
        confirmPassword.setErrors({"passwordMismatch" : true});
        return { "passwordMismatch": true };
      }
    }
  }
}
