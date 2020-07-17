import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListotherlinksPage } from './listotherlinks.page';

describe('ListotherlinksPage', () => {
  let component: ListotherlinksPage;
  let fixture: ComponentFixture<ListotherlinksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListotherlinksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListotherlinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
