import {provide, Provider} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import {Http, BaseRequestOptions} from '@angular/http';
import {Respond} from './respond';
import {HttpResponder} from './http-responder';
import {RequestMatcher} from './request-matcher';

const providers = [
  BaseRequestOptions,
  MockBackend,
  HttpResponder,
  Respond,
  provide(Http, {
    deps: [MockBackend, BaseRequestOptions],
    useFactory(backend, options){
      return new Http(backend, options);
    }
  })
];

export { Respond, HttpResponder, RequestMatcher };
export default providers;
