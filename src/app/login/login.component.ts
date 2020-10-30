import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthSocialLink } from '@nebular/auth';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { AuthService } from 'app/@guards/auth.services';

@Component({
  selector: 'ngx-test',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @ViewChild("f") form: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) { }

  protected service: NbAuthService;
  protected options: {};
  protected cd: ChangeDetectorRef;
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any = [];
  submitted: boolean;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;
  error: string;
  index = 1;


  ngOnInit() {
  }
  login() {
    this.authService
      .signInUser(this.user.email, this.user.password)
      .then(user => {
        console.log(user.user);
        this.authService.setLoginStatus(true);
        this.router.navigate(["/pages/dashboard"]);
        this.showToast('info', 'Successfully logged In', '')

      })
      .catch(err => (this.error = err.message));
    // this.form.reset();

  }
  getConfigValue() {

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
