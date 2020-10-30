/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import * as firebase from 'firebase';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    firebase.initializeApp({
      apiKey: "AIzaSyA68gNOZ-_3mtE-cY41it8D1IhoY7k9dyM",
      authDomain: "panacea-pos.firebaseapp.com",
      databaseURL: "https://panacea-pos.firebaseio.com",
      projectId: "panacea-pos",
      storageBucket: "panacea-pos.appspot.com",
      messagingSenderId: "296629937410",
      appId: "1:296629937410:web:2ba9e3ecc0d90d28980e1b",
      measurementId: "G-N0H9VLV4H9",
    });
  }
}
