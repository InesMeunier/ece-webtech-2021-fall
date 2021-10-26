
# Lab

OAuth2 and OpenID Connect enable the delegation of authorisation to an external service, not managed by our application. Dex can even delegate the authentication to multiple connector, an LDAP/AD directory or another OAuth provider like GitHub, thus acting like a federated OpenID Connect provider. We don't have to manage the security endpoints related to our application including account creation, login form, password retrieval, DDoS attacks and many more. It also provide us with an authentication mechanism where no password is being sent to us.

## Learn (easy)

I recommand to start by watching the excellent video [*An Illustrated Guide to OAuth and OpenID Connect*](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc) (about 16 minutes) to refresh your memory.

I wrote two articles which clarify and cover the [basics of OpenID Connect](https://www.adaltas.com/en/2020/11/17/oauth-openid-connect-intro/) and how to [integrate it with your public Application](https://www.adaltas.com/en/2020/11/20/oauth-microservices-public-app/). The latter comes with a [functional application](https://github.com/adaltas/node-openid-cli-usage/) from which you shall get inspiration by reading its source code.

Read those articles carefully. You will apply the steps of the second article in the next assignment.

## OAuth tutorial (medium)

Using the second tutorial, [*OAuth2 and OpenID Connect for microservices and public applications (Part 2)*](https://www.adaltas.com/en/2020/11/20/oauth-microservices-public-app/), install Dex and reproduce all the steps with the `npx openid-cli-usage` application using GitHub as a backend connector and PKCE since your React application is a public application. Don't forget to acticate CORS in the Dex configuration, we will need it for the next task.

## OAuth integration (hard)

Go into the `login` component of your application. We only need to work with this component for now. What we want is:

* The first time a user enter the application, he shall be presented with a login button;
* On click, he is redirected to our Open ID Connect provider (Dex), the URL construction is described in [*Step 1: Redirect URL generation*](https://www.adaltas.com/en/2020/11/20/oauth-microservices-public-app/#step-1-redirect-url-generation);
* Once logged with Dex, he is redirected to our application; the application print the content of the id token, such as the user email, and propose a link to logout.

In your code, you shall make use of cookies twice. The first time to store the code verifier, required to success in the authorisation code challenge and token retrieval, and the second time to store the user tokens, meaning that our user is logged in and his session persistent accross refresh.

Here's how your code shall behave:

1. Is there a code query parameters in the url   
   * No: we are no being redirected from an oauth server   
     2. A cookie store the user credential   
        * No: new user   
          3. Generate a code verifier from random bytes   
          4. Place the code verifier in a cookie   
          5. Generate the oauth redirect url   
          6. Propose the user to click on the redirect url   
        * Yes: user is already logged in, great, is is working   
          11. Print the user email information   
   * Yes: we are coming from an oauth server   
     7. Get the code verifier from the cookie as well as the code query parameter   
     8. Retrieve the tokens from the oauth server   
     9. Persist the token inside a session   
     10. Redirect to the same page without any extra query parameters (shall bring us to step 11)   
