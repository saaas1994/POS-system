import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from "rxjs";
import { AuthService } from './auth.services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastrService: NbToastrService,
  ) { }

  index = 1;
  logout: Observable<boolean>;

  // export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {


    if (!this.auth.LoginStatus) {
      console.log("LogIn First");
      console.log("State", state);
      this.showToast('warning', 'Login First', '')

      this.router.navigate(['pages/Login']);
    }
    else {
      this.showLogout()
    }
    console.log(this.auth.LoginStatus);
    console.log("State", state);
    return this.auth.LoginStatus;
  }

  showLogout() {
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
