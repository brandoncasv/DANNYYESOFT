import { TestBed } from '@angular/core/testing';

import { CorporatesListService } from './corporates-list.service';

describe('CorporateListService', () => {
  let service: CorporatesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporatesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
