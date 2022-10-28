import { TestBed } from '@angular/core/testing';

import { LinkedListService } from './linked-list.service';

describe('LinkedListService', () => {
  let service: LinkedListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
