import {Component} from '@angular/core';
import {Control, AbstractControl, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {NavController, ViewController, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import {CirclesPage} from '../circles/circles';
import {AuthService} from '../../services/authservice';
import {SignupPage} from '../signup/signup';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  private loginFormCtrl : ControlGroup;
  private userNameCtrl : AbstractControl;
  private passwordCtrl : AbstractControl;

  private username : string;
  private password : string;
  private authService;

  constructor(private navController: NavController, private http:Http,
    private view: ViewController, private formBuilder : FormBuilder) {
    this.authService = new AuthService(http);

    this.loginFormCtrl = formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      password: ['', Validators.required]
    });

    this.userNameCtrl = this.loginFormCtrl.controls['userName'];
    this.passwordCtrl = this.loginFormCtrl.controls['password'];
  }

  login() {
    this.authService.login(this.username,this.password).subscribe(
      data => {
        this.authService.saveToken(data.result);
        this.navController.push(CirclesPage);
      },
      err => {
        let alert = Alert.create({
          title: 'Authorization Failed',
          subTitle: 'Please check the username and password',
          buttons: ['OK']
      });

        this.navController.present(alert);
      }
    );
  }

  signup() {
    this.navController.push(SignupPage);
  }
}
