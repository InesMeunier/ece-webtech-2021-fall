
# Lab

The React Context API will simplify how to share data between multiple parts of our application.

We will store the user information inside a context. Create a Context Provider and wrap your application with it. Use the `setOauth` or `setUser` exported by the Provider to share the tokens returned by the OpenId Connect server. Use the `oauth` or `user` exported by the Context in the different section of your application to display the user information or to get access to the access token. Other properties such as the list of channels are good candidates.
