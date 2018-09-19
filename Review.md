# Review Questions

## What is Node.js?
Node.js is a program that allows javascript to be run outside of the browser.  
## What is Express?
Express is a framework that wraps http server requests.
## Mention two parts of Express that you learned about this week.
Routing and middleware
## What is Middleware?
Middleware is a program that intercepts data between the client and server and does something to it.
## What is a Resource?
A resource is an object that defines an action. The resources for this project are in the helper folder.
## What can the API return to help clients know if a request was successful?
Status code 200 (and the data requested). An unsuccessful request may have the code 404 if there is a problem from the client side - misformed syntax, missing required pieces, file too large. A client might also get a 500 error if something is wrong with the receiving server (not the client's fault).
## How can we partition our application into sub-applications?
We can seperate out our routes from our main server.
## What is CORS and why do we need it?
CORS stands for Cross-Origin Resource Sharing.  
It is a mechanism that allows the server to access resources in more than one location. CORS allows calls to an API under a different domain or port.  Before CORS, there was no standard way to make these types of calls due to security concerns.  CORS permissions are sent to the API through headers in the request.