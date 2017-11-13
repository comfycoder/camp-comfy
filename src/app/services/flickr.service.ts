import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

export interface FlickrResponse {
  photos: any;
}

@Injectable()
export class FlickrService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'https://api.flickr.com/services/rest';

  search(searchText: string): Observable<any> {

    console.log(searchText);

    const params = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('format', 'json')
      .set('api_key', '53286431b01976732160ae74b1c81a8b')
      .set('action', 'opensearch')
      .set('text', searchText)
      .set('per_page', '25')
      .set('media', 'photos')
      .set('content_type', '1')
      .set('format', 'json')
      .set('nojsoncallback', '1');

    return this.http.get(this.baseUrl, { params })
      .map((data) => this.extractData(data))
      .catch((err) => this.handleError(err));
  }

  private extractData(data): any[] {

    const photos: any[] = [];

    const respPhotos = data.photos.photo;

    for (let i = 0; i < respPhotos.length; i++) {

      const farm = respPhotos[i].farm;
      const server = respPhotos[i].server;
      const id = respPhotos[i].id;
      const secret = respPhotos[i].secret;
      const title = respPhotos[i].title;

      const photoUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

      let titleText = title;

      const pos = title.indexOf(' #');

      if (pos > 0) {
        titleText = title.substring(0, pos - 1);
      }

      photos.push({ url: photoUrl, title: titleText });
    }

    return photos;
  }

  private handleError(res: HttpErrorResponse | any) {

    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;

    if (res instanceof HttpErrorResponse) {
      const err = res.message || '';
      errMsg = `${res.status} - ${res.statusText || ''} ${err}`;
    }
    else {
      errMsg = res.message ? res.message : res.toString();
    }

    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
