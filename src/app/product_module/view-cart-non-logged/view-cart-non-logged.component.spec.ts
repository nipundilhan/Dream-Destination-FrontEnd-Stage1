import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartNonLoggedComponent } from './view-cart-non-logged.component';

describe('ViewCartNonLoggedComponent', () => {
  let component: ViewCartNonLoggedComponent;
  let fixture: ComponentFixture<ViewCartNonLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCartNonLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCartNonLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
