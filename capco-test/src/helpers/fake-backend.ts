import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { Requisition } from '../services/requisition.service';
import data from './data';

@Injectable()
class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const requisitions: Requisition[] = data;

    // wrap in delayed observable to simulate server api call
    return Observable.of(null)
      .mergeMap(() => {
        if (
          request.url.endsWith('/api/requisitions') &&
          request.method === 'GET'
        ) {
          return Observable.of(
            new HttpResponse({
              status: 200,
              body: requisitions
            })
          );
        }

        // pass through any requests not handled above
        return next.handle(request);
      })
      .materialize()
      .delay(500)
      .dematerialize();
  }
}

const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

export default FakeBackendProvider;
