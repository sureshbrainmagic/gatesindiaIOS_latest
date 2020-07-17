import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnginespecsPage } from './enginespecs.page';

describe('EnginespecsPage', () => {
  let component: EnginespecsPage;
  let fixture: ComponentFixture<EnginespecsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginespecsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnginespecsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
