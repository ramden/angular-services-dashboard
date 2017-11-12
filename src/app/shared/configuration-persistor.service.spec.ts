import { TestBed, inject } from '@angular/core/testing';

import { ConfigurationPersistorService } from './configuration-persistor.service';

describe('ConfigurationPersistorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationPersistorService]
    });
  });

  it('should be created', inject([ConfigurationPersistorService], (service: ConfigurationPersistorService) => {
    expect(service).toBeTruthy();
  }));
});
