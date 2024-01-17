import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMainComponent } from './products-main.component';

describe('ProductsMainComponent', () => {
  let component: ProductsMainComponent;
  let fixture: ComponentFixture<ProductsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
