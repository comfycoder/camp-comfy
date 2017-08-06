import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlickrComponent } from './search-flickr.component';

describe('SearchFlickrComponent', () => {
  let component: SearchFlickrComponent;
  let fixture: ComponentFixture<SearchFlickrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFlickrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFlickrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
