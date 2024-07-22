import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Messagetype1DialogComponent } from './messagetype1-dialog.component';

describe('Messagetype1DialogComponent', () => {
  let component: Messagetype1DialogComponent;
  let fixture: ComponentFixture<Messagetype1DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Messagetype1DialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Messagetype1DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
