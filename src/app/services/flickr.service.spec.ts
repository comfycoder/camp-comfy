import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FlickrService } from './flickr.service';

describe('FlickrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [FlickrService]
    });
  });

  it('should be created', inject([FlickrService], (service: FlickrService) => {
    expect(service).toBeTruthy();
  }));
});
