import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import {LoginPage} from '../login/login';
import {AuthService} from '../../services/authservice';
import {Contacts} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/circles/circles.html'
})
export class CirclesPage {

  private authService;

  constructor(private navParams: NavParams,
    private navController: NavController, private http:Http, private view: ViewController) {
      this.authService = new AuthService(http);
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.navController.push(LoginPage);
        this.authService.removeToken();
      },
      err => {
        console.error(err);
        let alert = Alert.create({
          title: 'Something Went Wrong',
          buttons: ['OK']
        });

        this.navController.present(alert);
      }
    );
  }

  add() {

  }

}
