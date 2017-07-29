import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title: Observable<string>;
  titleSubscription: any;

  public constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {

    this.title = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => {
        const routeSnapshot = this.router.routerState.snapshot.root;
        return this.getDeepestTitle(routeSnapshot);
      });

    this.titleSubscription = this.title.subscribe((title) => {
      const titleComplete = title && title.length > 0 ? 'Camp Comfy - ' + title : 'Camp Comfy';
      this.titleService.setTitle(titleComplete);
    });
  }

  ngOnDestroy() {
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
  }

  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
    const title = routeSnapshot.firstChild && routeSnapshot.firstChild.data &&
      routeSnapshot.firstChild.data.title ? routeSnapshot.firstChild.data.title : '';
    return title;
  }
}
