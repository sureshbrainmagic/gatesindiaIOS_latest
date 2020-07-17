import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-fabs',
  templateUrl: './fabs.component.html',
  styleUrls: ['./fabs.component.scss'],
})
export class FabsComponent implements OnInit {

  constructor(
    // private location: Location,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  previousPage() {
    this.navCtrl.back();
    // this.location.back();
  }

  goToHomeFn() {
    this.router.navigateByUrl('home');
  }

}
