import {Request, RequestMethod, Response} from 'angular2/http';

export class RequestMatcher{
  private _used = false;
  private _assertions: ((req: Request) => boolean)[] = [];

  constructor(private _response: Response){ }

  matchesRequest(req: Request){
    return this._assertions.reduce((prev, assertion) => {
      return prev && assertion(req);
    }, true);
  }

  method(method: RequestMethod): RequestMatcher{
    this._assertions.push((req: Request) => req.method === method);

    return this;
  }

  hasHeader(key: string, value?: string | string[]): RequestMatcher{
    this._assertions.push((req: Request) => {
      const headers = req.headers;

      if(!value){
        return headers.has(key);
      }

      let _value = Array.isArray(value) ? value.join(',') : value;

      return headers.has(key) && _value === headers.get(key);
    });

    return this;
  }

  body(body: any): RequestMatcher{
    this._assertions.push((req: Request) => {
      let _value = typeof body === 'string' ? body : JSON.stringify(body);
      return req.text() === _value;
    });

    return this;
  }

  url(url: string): RequestMatcher{
    this._assertions.push((req: Request) => req.url === url);

    return this;
  }

  get(url: string): RequestMatcher{
    this.url(url);
    return this.method(RequestMethod.Get);
  }

  post(url: string, body?: any): RequestMatcher{
    if(body){
      this.body(body);
    }

    this.url(url);
    return this.method(RequestMethod.Post)
  }

  put(url: string, body?: any): RequestMatcher{
    if(body){
      this.body(body);
    }

    this.url(url);
    return this.method(RequestMethod.Put);
  }

  delete(url: string): RequestMatcher{
    this.url(url);
    return this.method(RequestMethod.Delete);
  }

  match(assertion: (res: Request) => boolean): RequestMatcher{
    this._assertions.push(assertion);

    return this;
  }

  get response(){
    this._used = true;
    return this._response;
  }

  get used(){
    return this._used;
  }
}
