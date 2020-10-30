import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/@guards/auth.services';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  hiddeLogout: boolean;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  language = [
    { value: 'en', name: 'English', },
    { value: 'zh', name: 'Chinese', },
    { value: 'bm', name: 'Bahasa Melayu' },
    { value: 'fr', name: 'French' },
    { value: 'ind', name: 'Hindi' },
  ];
  index = 1;

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    public translate: TranslateService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.translate.addLangs(['en', 'zh', 'bm',,'fr','ind']);
    this.translate.setDefaultLang('en');

    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }
  test(bo): Observable<any> {
    console.log("Here",bo.loggedIn);
    if (bo.loggedIn == true) {
      this.hiddeLogout = true;
    }
    else {
      this.hiddeLogout = false;
    }
    return bo
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.authService.setLogOutStatus(false);
    this.router.navigate(['pages/Login']);
    this.showToast('danger', 'Logged Out', '')
    this.hiddeLogout = true;
    this.test(localStorage)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLangauge(langaugeName: string) {
    this.translate.use(langaugeName)
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
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
