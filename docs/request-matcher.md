# RequestMatcher
Created by a Respond object to match a request to a response:

```ts
const matcher: RequestMatcher = respond.ok().when;
```

### method(method)
Matches requests with the given method.

__Parameters__
* `method` __RequesetMethod__ The request method to match


_Returns_ __this__

```ts
respond.ok().when.method(RequestMethod.Put);
```

### hasHeader(key)
Matches requests that have the header key set

__Parameters__
* `key` __string__ The request header key to check


_Returns_ __this__

```ts
respond.ok().when.hasHeader('Auth');
```

### hasHeader(key, value)
Matches requests that have the header key set to the value provided

__Parameters__
* `key` __string__ The request header key to check
* `value` __string | string[]__ The request header value to check


_Return_ __this__

```ts
respond.ok().when.hasHeader('Auth', 'Token 123ABCD');
```

### body(body)
Matches requests that have the same body

__Parameters__
* `body` __any__ The request body object to match. Non-string bodies are automatically serialized to JSON


_Return_ __this__

```ts
respond.ok().when.body({ authenticated: true });
```

### url(url)
Matches requests that have the same URL

__Parameters__
* `url` __string__ The request URL to match


_Returns_ __this__

```ts
respond.ok().when.url('/api');
```


### get(url) / delete(url)
Shortcuts to set URL with the `GET` or `DELETE` methods

__Parameters__
* `url` __string__ The request URL to match


_Returns_ __this__

```ts
respond.ok().when.get('/api');
respond.ok().when.delete('/post/123');
```


### post(url, body) / put(url, body)
Shortcuts to set the URL and body with the `POST` and `PUT` methods

__Parameters__
* `url` __string__ The request URL to match
* `body` __any__ The request body to match


_Returns_ __this__

```ts
respond.ok().when.post('/users', { username: 'mikeryan' });
respond.ok().when.put('/posts/123', { title: 'Test' });
```

### match(assertion)
Create a custom assertion used to match the request

__Parameters__
* `assertion` __(req: Request) => boolean__ Function to match the Request


_Returns_ __this__

```ts
respond.ok().when.match(req => req.status === 404);
```
