import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirsComponent } from './souvenirs.component';

describe('SouvenirsComponent', () => {
  let component: SouvenirsComponent;
  let fixture: ComponentFixture<SouvenirsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouvenirsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouvenirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
