import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanhistroyPage } from './scanhistroy.page';

describe('ScanhistroyPage', () => {
  let component: ScanhistroyPage;
  let fixture: ComponentFixture<ScanhistroyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanhistroyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanhistroyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
