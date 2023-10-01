import { TestBed } from '@angular/core/testing';

import { ListSkillService } from './list-skill.service';

describe('ListSkillService', () => {
  let service: ListSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
