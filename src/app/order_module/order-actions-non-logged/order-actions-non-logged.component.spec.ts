import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderActionsNonLoggedComponent } from './order-actions-non-logged.component';

describe('OrderActionsNonLoggedComponent', () => {
  let component: OrderActionsNonLoggedComponent;
  let fixture: ComponentFixture<OrderActionsNonLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderActionsNonLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderActionsNonLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
