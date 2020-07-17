import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhatsnewPage } from './whatsnew.page';

describe('WhatsnewPage', () => {
  let component: WhatsnewPage;
  let fixture: ComponentFixture<WhatsnewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsnewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsnewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
