import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface UserCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(e: InputEvent, username: string, password: string): void {
    e.preventDefault();
    this.auth.login({ username, password }).subscribe({
      next: () => {
        this.router.navigate(['/sensors'])
      },
    });
  }
}
