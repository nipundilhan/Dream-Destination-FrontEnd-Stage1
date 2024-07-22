import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAdminViewOrdersComponent } from './shop-admin-view-orders.component';

describe('ShopAdminViewOrdersComponent', () => {
  let component: ShopAdminViewOrdersComponent;
  let fixture: ComponentFixture<ShopAdminViewOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopAdminViewOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAdminViewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
