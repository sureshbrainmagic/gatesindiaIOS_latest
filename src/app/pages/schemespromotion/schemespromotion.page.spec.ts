import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchemespromotionPage } from './schemespromotion.page';

describe('SchemespromotionPage', () => {
  let component: SchemespromotionPage;
  let fixture: ComponentFixture<SchemespromotionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemespromotionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchemespromotionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
