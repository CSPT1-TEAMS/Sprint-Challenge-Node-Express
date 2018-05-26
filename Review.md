# Review Questions

## What is Node.js?
Node.js is the backend server as react is the front-end "server" of a web client. Node lets you do asynchronous calls to the API, that is RESTFUL.
RESTFUL being; it's very quick.

## What is Express?
It is the framework used with node, that helps build web API's, and let's you make CRUD calls.

## Mention two parts of Express that you learned about this week.
Using middleware, and routing async server calls.

## What is Middleware?
A piece of code that let's you intercept server calls to "enhance" or modify so that the responses could be built more accurately, or just let's you modify
the server response.

## What is a Resource?
Would express be a resource of Node?

## What can the API return to help clients know if a request was successful?
A status. ErrorHandling can help the client know if a request/ response was successful or failed.

## How can we partition our application into sub-applications?
Do you mean how we can MODULARIZE our application? By creating new js files and ```module.exports``` and have them ```required``` in the main js file that
we use to run the server.

## What is CORS and why do we need it?
CORS let's two different URL's or clients communicate. If my website wanted to make a call to an API stored in my database, CORS let's me handle funtionality of the requested data.
