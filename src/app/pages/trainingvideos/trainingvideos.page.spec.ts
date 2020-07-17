import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainingvideosPage } from './trainingvideos.page';

describe('TrainingvideosPage', () => {
  let component: TrainingvideosPage;
  let fixture: ComponentFixture<TrainingvideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingvideosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingvideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
