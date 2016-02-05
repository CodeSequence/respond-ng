# respond-ng
#### Simple Mocking API for Angular 2's Http Service

To use, install respond-ng with npm:

```
npm install respond-ng --save-dev
```

Import the providers and Respond:

```ts
import HTTP_MOCK_PROVIDERS, {Respond} from 'respond-ng';
```

Create an injector, then use the injector to get an instance of Respond
and the service you are testing:

```ts
let respond: Respond, auth: AuthService;

beforeEach(function(){
  const injector = Injector.resolveAndCreate([
    HTTP_MOCK_PROVIDERS,
    AuthService
  ]);

  respond = injector.get(Respond);
  auth = injector.get(AuthService);
});
```

Write simple response mocks using Respond's fluent API:

```ts
it('should check if the user is authenticated', function(done){
  respond.ok({ authenticated: true }).when.get('/api/authenticated');

  auth.check().subscribe((res) => {
    expect(res.authenticated).toBe(true);
    done();
  });
});
```

After each test, verify there are no outstanding requests:
```ts
afterEach(() => respond.verifyComplete());
```

For more information, see docs for [Respond](docs/respond.md) and [RequestMatcher](docs/request-matcher.md). Happy testing!
