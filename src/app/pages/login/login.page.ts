import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  constructor(private router: Router) {}

  login() {
    // Implement your login logic here
  }

  goToSignupPage() {
    this.router.navigate(['/signup']);
  }
}
