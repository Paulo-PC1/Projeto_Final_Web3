import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../security/auth.service';
import { Permission } from '../permissions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  displayingMenu = false;

  // Exposto ao template para condicionar os itens do menu
  readonly perm = Permission;

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  get canManageExercises(): boolean {
    return this.auth.hasPermission(this.perm.REGISTER_EXERCISE);
  }

  logout(): void {
    this.auth.logout();
    this.displayingMenu = false;
    this.router.navigate(['/login']);
  }

}
