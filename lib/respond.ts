import {Injectable, Inject} from 'angular2/core';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {Response, Headers, ResponseOptions} from 'angular2/http';
import {RequestMatcher} from './request-matcher';
import {HttpResponder} from './http-responder';


@Injectable()
export class Respond{
  private _body: string = '';
  private _headers = new Headers();
  private _status = 200;
  private _url: string;

  constructor(private _responder: HttpResponder){ }

  withHeader(name: string, value: string | string[]): Respond{
    this._headers.set(name, value);

    return this;
  }

  withBody(body: any): Respond{
    this._body = typeof body === 'string' ? body : JSON.stringify(body);

    return this;
  }

  withStatus(status: number): Respond{
    this._status = status;

    return this;
  }

  withUrl(url: string): Respond{
    this._url = url;

    return this;
  }

  with(status: number, body: any = {}, headers?: Headers): Respond{
    this._headers = headers || this._headers;
    this.withStatus(status);
    this.withBody(body);

    return this;
  }

  ok(body?: any, headers?: Headers): Respond{
    return this.with(200, body, headers);
  }

  error(body?: any, headers?: Headers): Respond{
    return this.with(500, body, headers);
  }

  serialize(): Response{
    const options = new ResponseOptions({
      body: this._body,
      status: this._status,
      headers: this._headers,
      url: this._url
    });

    return new Response(options);
  }

  get when(): RequestMatcher{
    const matcher = new RequestMatcher(this.serialize());

    this._responder.addMatcher(matcher);

    return matcher;
  }

  verifyComplete(){
    this._responder.verifyNoUnusedMatchers();
  }
}
