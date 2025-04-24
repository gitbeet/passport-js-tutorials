## User authentication choices

- Session
- JSON Web Tokens (JWT)
- OAuth
  - In-house
  - SaaS
- Other/Ad-Hoc

## What is Passport JS?

- Welcome to Express middlewares!
  - On each HTTP request, Passport will use a "Strategy" to determine whether the requestor has permission to view that resource
  - If the user does not have permission, a 401 Unauthorized Error is thrown
- Passport Strategies?
  - Each strategy uses the Passport JS framework as a template
  - The Passport **Local** Strategy utilizes **Cookies**, **Express Sessions**, and some authentication logic

## HTTP Headers and Cookies

### What is a HTTP header?

HTTP headers are components of HTTP requests and responses that **_carry metadata_** about the message.They provide additional information between the client and the server, controlling how data is sent, received and processed.

Request header examples:

```
GET /example HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Cookie: session_id=abc123
```

Response header examples:

```
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session-id=123
```

Some headers ca be attached to both requests and responses:

```
Date: Wed, 24 Apr 2025 15:30:00 GMT
Connection: keep-alive
```

### Common HTTP headers and their purpose

- Host - Specifies the domain name of the server
- User-Agent - Identifies the client (browser, OS, device)
- Accept - Tells the server what content types the client can handle
- Content-Type - Indicates the media type of the response body (text/plain, text/html/ application/json ...)
- Autorization - Sends credentials (Bearer token for APIs)
- Cookie - Sends stored cookies to the server
- Set-Cookie - Server instructs the browser to store a cookie
  Cache-Control - Defines caching behavior (no-cache, max-age=3600 ...)

### Why are headers important?

- Security (CORS, Content-Security-Polic, HTTS)
- Performance (Cache-control, Accept-Encoding for compression)
- Session Management (Set-Cookie, Authorization)
- Content Negotiation (Accept-Language, Accept-Encoding)

### Cookie related headers

HTTP cookies rely on specific headers for setting, sending and managing cookies between clients (browsers)
and servers. Here's a breakdown of all cookie-related headers and their functionalities:

#### Set-Cookie (Server -> Client)

```
Set-Cookie: <name> = <value> [; attributes]
```

Key attribues:

- Expire
- Max-Age
- Domain - specifies which domains can receive the cookie
- Path - restricts cookie to a certain URL path
- Secure - sent only over HTTPS
- HttpOnly - Blocks JS access
- SameSite - Controls cross-site cookie sending

#### Cookie (Client -> Server)

Sent by the client to include stored cookies in subsequent requests

**HTTP Protocols are stateless and therefore don't remember anything about the user after each request-response cycle. Cookies help us keep some state between the client and the server**
