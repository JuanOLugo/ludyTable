import { TestBed } from '@angular/core/testing';

import { DialogstateService } from './dialogstate.service';

describe('DialogstateService', () => {
  let service: DialogstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
