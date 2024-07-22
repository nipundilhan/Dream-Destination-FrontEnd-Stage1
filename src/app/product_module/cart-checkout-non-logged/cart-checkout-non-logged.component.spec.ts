import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutNonLoggedComponent } from './cart-checkout-non-logged.component';

describe('CartCheckoutNonLoggedComponent', () => {
  let component: CartCheckoutNonLoggedComponent;
  let fixture: ComponentFixture<CartCheckoutNonLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCheckoutNonLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCheckoutNonLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
