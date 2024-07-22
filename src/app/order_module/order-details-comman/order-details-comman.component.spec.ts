import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsCommanComponent } from './order-details-comman.component';

describe('OrderDetailsCommanComponent', () => {
  let component: OrderDetailsCommanComponent;
  let fixture: ComponentFixture<OrderDetailsCommanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsCommanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsCommanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
