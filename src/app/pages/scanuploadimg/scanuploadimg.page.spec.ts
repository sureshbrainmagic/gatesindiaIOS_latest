import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanuploadimgPage } from './scanuploadimg.page';

describe('ScanuploadimgPage', () => {
  let component: ScanuploadimgPage;
  let fixture: ComponentFixture<ScanuploadimgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanuploadimgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanuploadimgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
