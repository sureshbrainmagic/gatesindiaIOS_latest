import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(
    private iab: InAppBrowser,
    private callNumber: CallNumber,
    private launchNavigator: LaunchNavigator,
    private emailComposer: EmailComposer
  ) { }

  ngOnInit() {
  }


  openExternalURL() {
    this.iab.create('http://www.Gates.com/', '_system');
  }

  callFN(num) {
    this.callNumber.callNumber(num, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  openLocation() {
    // let options: LaunchNavigatorOptions = {
    //   start: 'London, ON',
    //   app: LaunchNavigator.APPS.UBER
    // }
    let address = "GATES UNITTA INDIA COMPANY PRIVATE LIMITED, F-19, SIPCOT Industrail Area, Kanchipuram District, Tamil Nadu"    
    this.launchNavigator.navigate(address)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  openMailfn() {
    
    
    let email = {
      to: 'CC-AAMI@gates.com',
    }
    
    // Send a text message using default options
    this.emailComposer.open(email);
    
  }

}
