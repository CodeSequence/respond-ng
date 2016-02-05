import {RequestMatcher} from './request-matcher';
import {
  Request,
  Response,
  ResponseOptions,
  Headers,
  ResponseOptionsArgs,
  RequestOptionsArgs,
  RequestMethod
} from 'angular2/http';

interface RequestArgs extends RequestOptionsArgs { url: string; }

function res(config: ResponseOptionsArgs = {}){
  return new Response(new ResponseOptions(config));
}

function req(config: RequestArgs){
  return new Request(config);
}

describe('Request Matcher', function(){
  let matcher: RequestMatcher;

  it('should correctly match the method of a request', () => {
    const matcher = new RequestMatcher(res());
    const get = req({ method: RequestMethod.Get, url: '' });
    const post = req({ method: RequestMethod.Post, url: '' });

    matcher.method(RequestMethod.Get);

    expect(matcher.matchesRequest(get)).toBe(true);
    expect(matcher.matchesRequest(post)).toBe(false);
  });

  it('should correctly match the URl of a request', () => {
    const matcher = new RequestMatcher(res());
    const correct = req({ url: 'pass' });
    const fail = req({ url: 'fail' });

    matcher.url('pass');

    expect(matcher.matchesRequest(correct)).toBe(true);
    expect(matcher.matchesRequest(fail)).toBe(false);
  });

  it('should correctly match the body', () => {
    const matcher = new RequestMatcher(res());
    const correct = req({ url: '', body: 'pass' });
    const fail = req({ url: '', body: 'fail' });

    matcher.body('pass');

    expect(matcher.matchesRequest(correct)).toBe(true);
    expect(matcher.matchesRequest(fail)).toBe(false);
  });

  it('should correctly stringify object bodies', () => {
    const body = { auth: true };
    const matcher = new RequestMatcher(res());
    const correct = req({ url: '', body: JSON.stringify(body) });

    matcher.body({ auth: true });

    expect(matcher.matchesRequest(correct)).toBe(true);
  });

  it('should mark itself as used when the response is retrieved', () => {
    const matcher = new RequestMatcher(res());

    expect(matcher.used).toBe(false);

    matcher.response;

    expect(matcher.used).toBe(true);
  });

  describe('Header Matching', () => {
    let request: Request, headers: Headers, matcher: RequestMatcher;

    beforeEach(() => {
      matcher = new RequestMatcher(res());
      headers = new Headers();

      headers.set('pass', '123');
      headers.set('passAgain', ['1', '2', '3']);
      request = req({ url: '', headers });
    });

    it('should match if the header is present', () => {
      matcher.hasHeader('pass');

      expect(matcher.matchesRequest(request)).toBe(true);
    });

    it('should not match if the header is missing', () => {
      matcher.hasHeader('fail');

      expect(matcher.matchesRequest(request)).toBe(false);
    });

    it('should match the header value if provided', () => {
      matcher.hasHeader('pass', '123');

      expect(matcher.matchesRequest(request)).toBe(true);
    });

    it('should fail if the value does not match', () => {
      matcher.hasHeader('pass', '234');

      expect(matcher.matchesRequest(request)).toBe(false);
    });

    it('should match the header value if it is an array', () => {
      matcher.hasHeader('passAgain', ['1', '2', '3']);

      expect(matcher.matchesRequest(request)).toBe(true);
    });

    it('should fail if the array value does not match', () => {
      matcher.hasHeader('passAgain', ['2', '3', '4']);

      expect(matcher.matchesRequest(request)).toBe(false);
    });
  });
});
