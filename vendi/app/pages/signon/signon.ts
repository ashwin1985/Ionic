import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {Http} from '@angular/http';
import {CirclesPage} from '../circles/circles';
import {FundingInfoPage} from '../fundinginfo/fundinginfo';
import {User} from '../../models/user';
import {AuthService} from '../../services/authservice';

@Component({
  templateUrl: 'build/pages/signon/signon.html'
})
export class SignOnPage {

  private user = new User();
  private authService;

  constructor(private navController: NavController,
    private view: ViewController, private http:Http) {
      this.authService = new AuthService(http);
    }

  signOn() {
    this.authService.signup(this.user).subscribe(
      data => {
        if(data) {
          this.navController.push(FundingInfoPage);
        } else {
          alert('failure')
        }
      },
      err => console.error(err)
    );
  }

}
