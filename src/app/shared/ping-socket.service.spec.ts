import { TestBed, inject } from '@angular/core/testing';

import { PingSocketService } from './ping-socket.service';

describe('PingSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PingSocketService]
    });
  });

  it('should be created', inject([PingSocketService], (service: PingSocketService) => {
    expect(service).toBeTruthy();
  }));
});
