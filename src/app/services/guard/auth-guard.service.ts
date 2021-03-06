import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authenticationService: AuthenticationService
  ) { }
  
  canActivate(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}