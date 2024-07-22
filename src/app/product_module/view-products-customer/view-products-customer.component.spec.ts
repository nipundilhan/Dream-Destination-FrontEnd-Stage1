import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsCustomerComponent } from './view-products-customer.component';

describe('ViewProductsCustomerComponent', () => {
  let component: ViewProductsCustomerComponent;
  let fixture: ComponentFixture<ViewProductsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductsCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
