# PUG template engine

1. installation
   <code>npm install pug</code>

## locals

0. documentation
   [Click](https://expressjs.com/ko/4x/api.html#res.locals)

1. res.locals

```
An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any). Otherwise, this property is identical to app.locals.


This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
```

2. example

```javascript
app.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.authenticated = !req.user.anonymous;
  next();
});
```

# MongoDB

- mongo db community edition

## moongoosejs

- https://mongoosejs.com/
- npm install mongoose

## dotenv

- npm install dotenv
