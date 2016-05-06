import {Injectable, Inject} from '@angular/core';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Response, Headers, ResponseOptions} from '@angular/http';
import {RequestMatcher} from './request-matcher';
import {HttpResponder} from './http-responder';


@Injectable()
export class Respond{
  private _body: string;
  private _headers: Headers;
  private _status: number;
  private _url: string;

  constructor(private _responder: HttpResponder){
    this._reset();
  }

  private _reset(){
    this._body = '';
    this._headers = new Headers();
    this._status = 200;
    this._url = undefined;
  }

  serialize(): Response{
    const options = new ResponseOptions({
      body: this._body,
      status: this._status,
      headers: this._headers,
      url: this._url
    });

    this._reset();

    return new Response(options);
  }

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

  get when(): RequestMatcher{
    const matcher = new RequestMatcher(this.serialize());

    this._responder.addMatcher(matcher);

    return matcher;
  }

  verifyComplete(){
    this._responder.verifyNoUnusedMatchers();
  }
}
