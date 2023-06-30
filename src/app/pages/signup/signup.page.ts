import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  selectedLanguage: string;
  languages: any;
  emailValid: boolean = true;
  passwordValid: boolean = true;
  passwordMismatch: boolean = false;

  constructor( private apiService: ApiService) {

  }

  signUp() {
    this.validateForm();

    if (this.emailValid && this.passwordValid && !this.passwordMismatch) {
      const data = {
        email : this.email,
        password : this.password,
        language_id : this.selectedLanguage,
      }
      this.apiService.signup(data).subscribe(
        (response) => {
          // Handle the API response
          console.log(response);
        },
        (error) => {
          // Handle API error
          console.error(error);
        }
      );
    }
  }

  validateForm() {
    // Validate email
    if (this.email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.emailValid = emailRegex.test(this.email);
    } else {
      this.emailValid = true;
    }

    // Validate password length
    if (this.password) {
      this.passwordValid = this.password.length >= 6;
    } else {
      this.passwordValid = true;
    }

    // Check if passwords match
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  ngOnInit(): void {
  }

  async ionViewDidEnter() {
     await this.apiService.getLanguages().subscribe(
      (response) => {
        // Handle the API response
        this.languages = response;
      },
      (error) => {
        // Handle API error
        console.error(error);
      }
    );
  }
}
