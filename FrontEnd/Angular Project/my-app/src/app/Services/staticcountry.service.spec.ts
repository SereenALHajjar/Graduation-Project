import { TestBed } from '@angular/core/testing';

import { StaticcountryService } from './staticcountry.service';

describe('StaticcountryService', () => {
  let service: StaticcountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticcountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
