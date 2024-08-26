import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityCaptureComponent } from './identity-capture.component';

describe('IdentityCaptureComponent', () => {
  let component: IdentityCaptureComponent;
  let fixture: ComponentFixture<IdentityCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentityCaptureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentityCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
