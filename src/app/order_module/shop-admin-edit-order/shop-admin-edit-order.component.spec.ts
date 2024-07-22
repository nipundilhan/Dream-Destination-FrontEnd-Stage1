import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAdminEditOrderComponent } from './shop-admin-edit-order.component';

describe('ShopAdminEditOrderComponent', () => {
  let component: ShopAdminEditOrderComponent;
  let fixture: ComponentFixture<ShopAdminEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopAdminEditOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAdminEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
