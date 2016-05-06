import {Inject, Injectable} from '@angular/core';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {XHRBackend} from '@angular/http';
import {RequestMatcher} from './request-matcher';
import {methodToString} from './util';

@Injectable()
export class HttpResponder{
  private _matchers: RequestMatcher[] = [];

  constructor(backend: MockBackend){
    backend.connections.subscribe((connection: MockConnection) => {
      this.test(connection);
    });
  }

  test(connection: MockConnection){
    const req = connection.request;
    const match = this._matchers
      .filter(matcher => !matcher.used)
      .find(matcher => matcher.matchesRequest(req));

    if(!match){
      throw new Error(
        `Unexpected request: ${methodToString(req.method)} ${req.url}`
      );
    }

    const res = match.response;
    if(res.status < 200 || res.status > 299){
      connection.mockError(<any>res);
    }
    else{
      connection.mockRespond(<any>res);
    }
  }

  addMatcher(matcher: RequestMatcher){
    this._matchers.push(matcher);
  }

  verifyNoUnusedMatchers(){
    const unused = this._matchers.filter(matcher => !matcher.used);

    if(unused.length > 0){
      throw new Error(`Unmet expectations found!`);
    }
  }
}
