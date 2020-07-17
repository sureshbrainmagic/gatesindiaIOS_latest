import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnginecodePage } from './enginecode.page';

describe('EnginecodePage', () => {
  let component: EnginecodePage;
  let fixture: ComponentFixture<EnginecodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginecodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnginecodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
