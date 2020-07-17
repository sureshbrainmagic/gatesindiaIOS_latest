import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherlinksPage } from './otherlinks.page';

describe('OtherlinksPage', () => {
  let component: OtherlinksPage;
  let fixture: ComponentFixture<OtherlinksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherlinksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherlinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
