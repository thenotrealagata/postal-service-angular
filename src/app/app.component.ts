import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'Postal service';

  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.currentlyLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn),
    );
  }

  logout() {
    this.authService.logout();
  }
}
