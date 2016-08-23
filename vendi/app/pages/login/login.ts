import {Component} from '@angular/core';
import {NavController, ViewController, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import {CirclesPage} from '../circles/circles';
import {SignOnPage} from '../signon/signon';
import {AuthService} from '../../services/authservice';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  private username = ""
  private password = ""
  private authService;

  constructor(private navController: NavController, private http:Http,
    private view: ViewController) {
    this.authService = new AuthService(http);
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
    this.navController.push(SignOnPage);
  }
}
