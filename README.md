# respond-ng
#### Simple Mocking API for Angular 2's Http Service

To use, install the package with npm:

```
npm install respond-ng --save-dev
```

Import the providers and Respond:

```ts
import HTTP_MOCK_PROVIDERS, {Respond} from 'respond-ng';
```

Create an injector then use the injector to get an instance of Respond
and the service you are testing:

```ts
let respond: Respond, auth: AuthService;

beforeEach(function(){
  const injector = Injector.resolveAndCreate([
    HTTP_MOCK_PROVIDERS,
    AuthService
  ]);

  respond = injector.get(Respond);
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

After each test, make sure you verify there are no outstanding requests:
```ts
afterEach(respond.verifyComplete());
```

Happy testing!
