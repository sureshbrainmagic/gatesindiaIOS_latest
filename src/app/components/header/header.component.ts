import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() pagetitle: string;
  @Input() segment: string;
  @Input() make: string;
  @Input() model: string;
  @Input() enginecode: string;
  @Input() cc: string;
  @Input() article: string;
  constructor() { }

  ngOnInit() {}

}
