import { TestBed } from '@angular/core/testing';

import { ListskillService } from './listskill.service';

describe('ListskillService', () => {
  let service: ListskillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListskillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
