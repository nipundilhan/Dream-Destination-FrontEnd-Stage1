import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAllUnseenMsgsComponent } from './order-all-unseen-msgs.component';

describe('OrderAllUnseenMsgsComponent', () => {
  let component: OrderAllUnseenMsgsComponent;
  let fixture: ComponentFixture<OrderAllUnseenMsgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAllUnseenMsgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAllUnseenMsgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
