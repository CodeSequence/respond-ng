# Respond
Respond is used to create responses with a fluent API

```ts
import RESPOND_PROVIDERS, {Respond} from 'respond-ng';

const injector = Injector.resolveAndCreate([
  RESPOND_PROVIDERS
]);

const respond = injector.get(Respond);

respond.withBody({ error: 'Not Found' }).withStatus(404);
```

### withHeader(name, value)
Adds a header to the response object

__Parameters__
* `name` __string__ Name of the header to set
* `value` __string | string[]__ Value of the header to set


_Returns_ __this__

```ts
respond.withHeader('Accept', 'text/json')
```


### withBody(body)
Sets the body for the response object

__Parameters__
* `body` __any__ Body string or object. If it is an object it will be serialized to JSON


_Returns_ __this__

```ts
respond.withBody({ auth: true })
```

### withStatus(status)
Sets the status code of the response object. If the code is less than 200 or greater than 299 then the response will be treated like a failure.

__Parameters__
* `status` __number__ The status code to set


_Returns_ __this__

```ts
respond.withStatus(404)
```

### withUrl(url)
Sets the URL of the response object

__Parameters__
* `url` __string__ The response object's URL


_Returns_ __this__

```ts
respond.withUrl('/api')
```

### with(status, body, headers)
Shortcut to set the status, body, and headers in one call

__Parameters__
* `status` __number__ Status code of the response
* `body` _optional_ __any__ Body of the response
* `headers` _optional_ __Headers__ Headers object to use


_Returns_ __this__

```ts
const headers = new Headers();
headers.set('Accept', 'text/json');

respond.with(500, { error: 'Internal Server Error' }, headers)
```

## ok(body, headers)
Shortcut to set the body and headers with a 200 status code

__Parameters__
* `body` _optional_ __any__ Body of the response
* `headers` _optional_ __Headers__ Headers object to use


_Returns_ __this__

```ts
const headers = new Headers();
headers.set('Accept', 'text/json');

respond.ok({ authenticated: true }, headers)
```

## error(body, headers)
Shortcut to set the body and headers with a 500 status code

__Parameters__
* `body` _optional_ __any__ Body of the response
* `headers` _optional_ __Headers__ Headers object to use


_Returns_ __this__

```ts
const headers = new Headers();
headers.set('Accept', 'text/json');

respond.error({ authenticated: false }, headers)
```


## when
Serializes the response, then creates and registers a new `RequestMatcher` for the response

_Returns_ __RequestMatcher__

```ts
respond.ok().when.get('/api');
```
