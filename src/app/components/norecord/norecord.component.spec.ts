import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NorecordComponent } from './norecord.component';

describe('NorecordComponent', () => {
  let component: NorecordComponent;
  let fixture: ComponentFixture<NorecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorecordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NorecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
