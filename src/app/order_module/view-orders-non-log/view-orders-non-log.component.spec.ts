import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdersNonLogComponent } from './view-orders-non-log.component';

describe('ViewOrdersNonLogComponent', () => {
  let component: ViewOrdersNonLogComponent;
  let fixture: ComponentFixture<ViewOrdersNonLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrdersNonLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrdersNonLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
