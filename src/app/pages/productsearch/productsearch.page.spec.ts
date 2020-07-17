import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsearchPage } from './productsearch.page';

describe('ProductsearchPage', () => {
  let component: ProductsearchPage;
  let fixture: ComponentFixture<ProductsearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
