import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import {LoginPage} from '../login/login';
import {AuthService} from '../../services/authservice';
import {Contacts} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/addcircles/addcircles.html'
})
export class AddCirclesPage {

  constructor(private navParams: NavParams,
    private navController: NavController, private http:Http, private view: ViewController) {

  }

  add() {

  }

}
