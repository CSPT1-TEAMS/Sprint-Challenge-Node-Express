# Review Questions

## What is Node.js?
* Node.js is library that allows javascript to be run on servers as opposed to a browser.  Node essentially wraps additional functionality around Google's V8 Javascript engine to make this possible.

## What is Express?
  Express is an application framework that enables development of web and mobile applications for Node.js

## Mention two parts of Express that you learned about this week.
Routing and middleware.

## What is Middleware?
Middleware refers to functions that intercept requests and performs some type of process on the data/values/functions then passes the result to the original target.  For example, express.json parses requests with json payloads.

## What is a Resource?
A resource is an object that let's you interact with RESTful server-side data sources.

## What can the API return to help clients know if a request was successful?
The API can return an HTTP status code.  Typically 200.

## How can we partition our application into sub-applications?
You can partion an application into sub-applications by moving blocks of related code into separate modules.   For example all middleware can be moved from the main app into a seprate module which may be named 'middlewares.js'.  These functions can then be called by the main app. It makes code cleaner.

## What is CORS and why do we need it?
CORS is an acronym for Cross-Origin Resource Sharing which is a mechanism that uses HTTP headers to allow apps to request resources outside the domain of the originating app.  This is needed because browsers are designed to restrict access to resources outside the originating domain.  For example, your app originating from yourDomain.com might use CORS when pulling in a series from images from the Getty Image library.