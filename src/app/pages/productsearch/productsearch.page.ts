import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-productsearch',
  templateUrl: './productsearch.page.html',
  styleUrls: ['./productsearch.page.scss'],
})
export class ProductsearchPage implements OnInit {

  constructor(
    // private log: LogService
  ) { }

  ngOnInit() {
    // this.log.postLogDetails('HVC', 'ask');
  }

}
