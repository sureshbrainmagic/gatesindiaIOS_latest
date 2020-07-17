import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideosdetailsPage } from './videosdetails.page';

describe('VideosdetailsPage', () => {
  let component: VideosdetailsPage;
  let fixture: ComponentFixture<VideosdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideosdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
