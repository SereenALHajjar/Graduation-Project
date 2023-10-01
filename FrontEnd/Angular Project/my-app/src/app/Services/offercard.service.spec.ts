import { TestBed } from '@angular/core/testing';

import { OffercardService } from './offercard.service';

describe('OffercardService', () => {
  let service: OffercardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffercardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
