import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsManualComponent } from './settings-manual.component';

describe('SettingsManualComponent', () => {
  let component: SettingsManualComponent;
  let fixture: ComponentFixture<SettingsManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
