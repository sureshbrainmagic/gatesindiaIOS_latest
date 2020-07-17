import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchoegatescrossrefPage } from './searchoegatescrossref.page';

describe('SearchoegatescrossrefPage', () => {
  let component: SearchoegatescrossrefPage;
  let fixture: ComponentFixture<SearchoegatescrossrefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchoegatescrossrefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchoegatescrossrefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
