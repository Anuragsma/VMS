import { TestBed } from '@angular/core/testing';

import { RegisterGuestService } from './register-guest.service';

describe('RegisterGuestService', () => {
  let service: RegisterGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
