import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/fundinginfo/fundinginfo.html'
})
export class FundingInfoPage {

  constructor(private navController: NavController) {}

  addFundingSources() {
    this.redirectToLoginPage();
  }

  skip() {
    this.redirectToLoginPage();
  }

  redirectToLoginPage() {
    this.navController.push(LoginPage);
  }

}
