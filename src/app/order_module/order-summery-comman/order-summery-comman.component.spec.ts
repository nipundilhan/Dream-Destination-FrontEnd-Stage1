import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummeryCommanComponent } from './order-summery-comman.component';

describe('OrderSummeryCommanComponent', () => {
  let component: OrderSummeryCommanComponent;
  let fixture: ComponentFixture<OrderSummeryCommanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSummeryCommanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSummeryCommanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
