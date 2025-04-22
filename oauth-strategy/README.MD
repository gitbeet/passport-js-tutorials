### OAuth pros:

- No forms
- No need for the user to remember one more password
- Use few identities (facebook, google, etc) to login anywhere

### Basic flow:

- Click on sign in with google button
- Consent screen pops up
- Allow / Deny
- Allow redirects us back to the website
- We can use the user data for our database

### More detailed flow:

- Click on sign in with google button
- **_(Passport.js)_** Redirect to _auth/google_
- Redirect to the permission screen
- After you consent you get redirected to custom route (_auth/google/redirect_) with a redirect code
- **_(Passport.js)_** Use the given redirect code to get user profile info
- We can then lookup the user data to see if it already exists or we need to create one
- **_(Passport.js)_** Create a unique cookie that tells the browser that the user has been authenticated so they can continue navigating to the protected pages without being told to log in on each request
- Send the cookie to the browser
- The browser then stores the cookie and sends it on each request to our app
- **_(Passport.js)_** after the cookie is sent to the server again on each request we need to decode it and retrieve the user's information
