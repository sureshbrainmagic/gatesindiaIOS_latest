import { Component, OnInit } from '@angular/core';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/auth/authentication.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ToastService } from './services/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './services/config/config.service';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public username;
  public userEmail;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About Gates',
      url: '/aboutus',
      icon: 'person-circle'
    },
    {
      title: 'Product Search',
      url: '/productsearch',
      icon: 'search'
    },
    {
      title: 'Other Links & Product Info',
      url: '/otherlinks',
      icon: 'link'
    },
    {
      title: 'Whats New! ',
      url: '/whatsnew',
      icon: 'gift'
    },
    {
      title: 'Schemes & Promotion',
      url: '/schemespromotion',
      icon: 'file-tray'
    },
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications-circle'
    },
    {
      title: 'Distribution Network',
      url: '/network',
      icon: 'globe'
    },
    {
      title: 'Contact US',
      url: '/contactus',
      icon: 'call'
    }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private navController: NavController,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private screenOrientation: ScreenOrientation,
    private network: Network,
    private alertCtrl: AlertController,
    private toastCtrl: ToastService,
    private http: HttpClient,
    private config: ConfigService,
    private loadService: LoaderService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.splashScreen.hide();

      const chkOtpEntered = localStorage.getItem('isOTPEntered');
      if (chkOtpEntered === 'false') {
        this.chkwebOtpverifiy();
        console.log('Call Webotpverify Method');
      }

      // console.log(localStorage.getItem('isOTPEntered'));

      this.authenticationService.authState.subscribe(state => {
        console.log(state);
        // alert(state);
        if (state) {
          // this.navController.navigateRoot(['home']);
          this.navController.navigateRoot('/home');
          this.username = localStorage.getItem('name');

          if (localStorage.getItem('email') != null && localStorage.getItem('email') != undefined) {
            this.userEmail = localStorage.getItem('email');
          }
          
        } else {
          // this.navController.navigateRoot(['register']);
          this.navController.navigateRoot('/register');
        }
      });

      this.checkGPSPermission();
      // watch network for a disconnection
      const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected ☹️');
        // this.toastCtrl.toastFn('Internet not available  ☹️', 'bottom');
        this.exitFunction('Internet not available ☹️. Turn on Internet and try again');
      });

      // stop disconnect watch
      disconnectSubscription.unsubscribe();

      // watch network for a connection
      const connectSubscription = this.network.onConnect().subscribe(() => {
        this.toastCtrl.toastFn('Network connected! ☺️ ', 'bottom');
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            this.toastCtrl.toastFn('we got a wifi connection ☺️, woohoo!', 'bottom');
          }
        }, 3000);
      });
      // stop connect watch
      connectSubscription.unsubscribe();
    });
  }





  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        // alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              this.enableGpsAlertFn();
              // alert('requestPermission Error requesting location permissions ' + error);
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
      },
      error => {
        this.enableGpsAlertFn();
        // this.checkGPSPermission();
        // alert('Error requesting location permissions ' + JSON.stringify(error));
      }
    );
  }

  async exitFunction(msg: string) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   handler: () => {

        //   }
        // },
        {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
            // console.log('Confirm Okay');
          }
        }
      ]

    });

    await alert.present();
  }

  async enableGpsAlertFn() {
    const alert = await this.alertCtrl.create({
      header: `If you don't enable GPS, Registration Not To be Done. Please Enable GPS`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            // this.checkGPSPermission();
            navigator['app'].exitApp();
          }
        },
        {
          text: 'YES',
          handler: () => {
            // navigator['app'].exitApp();
            this.checkGPSPermission();
          }
        }
      ]

    });

    await alert.present();
  }

  chkwebOtpverifiy() {
    const UserType = localStorage.getItem('usertype');
    const MobileNo =  localStorage.getItem('mobileno');
    const bodyValues = {
      "MobileNo" : UserType,
      "UserType" : MobileNo
    };
    const url = `${this.config.configURL}api/Values/webOtpverifiy`;
    this.loadService.present('Verifying User ...', 'circular');
    this.http.post(url, bodyValues).subscribe(data => {
      console.log(data);
      const response: any = data;
      if (response.result === 'NotVerified') {
        this.toastCtrl.toastFn('Your Account is not Activated Yet', 'bottom');
      } else if (response.response === 'Verified') {
        this.toastCtrl.toastFn('Your Account is Activated', 'bottom');
        this.authenticationService.login();
        this.navController.navigateRoot('/home');
      }
      // if (response.result === 'Success') {
      //   // this.whatsNewsJson = response.data;
      //   // this.showData = true;
      //   // this.loadService.dismiss();
      // }
      this.loadService.dismiss();
    }, error => {
      this.loadService.dismiss();
      console.log(error);
    });

  }

}
