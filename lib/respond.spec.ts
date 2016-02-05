import {Respond} from './respond';
import {RequestMatcher} from './request-matcher';

describe('Respond', function(){
  let respond: Respond, mockResponder: {
    addMatcher: jasmine.Spy,
    verifyNoUnusedMatchers: jasmine.Spy
  };

  beforeEach(() => {
    mockResponder = <any>{
      addMatcher(){},
      verifyNoUnusedMatchers(){}
    };
    spyOn(mockResponder, 'addMatcher');
    spyOn(mockResponder, 'verifyNoUnusedMatchers');

    respond = new Respond(<any>mockResponder);
  });


  it('should add headers to the response', () => {
    respond.withHeader('test', '123');
    const res = respond.serialize();

    expect(res.headers.has('test')).toBe(true);
    expect(res.headers.get('test')).toEqual('123');
  });

  it('should set the status of the response', () => {
    respond.withStatus(341);
    const res = respond.serialize();

    expect(res.status).toEqual(341);
  });

  it('should set the URL of the response', () => {
    respond.withUrl('test');
    const res = respond.serialize();

    expect(res.url).toEqual('test');
  });

  it('should set the body of the response', () => {
    respond.withBody('test');
    const res = respond.serialize();

    expect(res.text()).toEqual('test');
  });

  it('should serialize non-string bodies into JSON', () => {
    const body = { auth: true };
    respond.withBody(body);
    const res = respond.serialize();

    expect(res.text()).toEqual(JSON.stringify(body));
    expect(res.json()).toEqual(body);
  });

  it('should re-initialize itself after serialization to allow for re-use', () => {
    const res = respond.withUrl('/api').withStatus(404).withBody('test').serialize();
    const nextRes = respond.serialize();

    expect(res.url).not.toEqual(nextRes.url);
    expect(res.status).not.toEqual(nextRes.status);
    expect(res.text()).not.toEqual(nextRes.text());
  });

  it('should create a request matcher and add it to the responder', () => {
    const matcher = respond.when;

    expect(matcher instanceof RequestMatcher).toBe(true);
    expect(mockResponder.addMatcher).toHaveBeenCalledWith(matcher);
  });
});
