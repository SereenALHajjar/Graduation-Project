import { TestBed } from '@angular/core/testing';

import { ProjectLinksService } from './project-links.service';

describe('ProjectLinksService', () => {
  let service: ProjectLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
