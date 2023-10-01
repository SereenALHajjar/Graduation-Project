import { TestBed } from '@angular/core/testing';

import { StaticusersService } from './staticusers.service';

describe('StaticusersService', () => {
  let service: StaticusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
