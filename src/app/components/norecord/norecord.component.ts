import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-norecord',
  templateUrl: './norecord.component.html',
  styleUrls: ['./norecord.component.scss'],
})
export class NorecordComponent implements OnInit {

  @Input() isNoRecord: boolean ;
  constructor() { }

  ngOnInit() {}

}
