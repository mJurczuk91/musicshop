![App screenshot](https://i.ibb.co/1X2Cxwg/Screenshot-from-2024-04-13-13-14-27.png)

## What is this 🧐

It's a music shop full stack web application.

## Well, can i see it running?

Sure! There's a live demo deployed to vercel:
https://musicshop-alpha.vercel.app

Should you wish to check out the 'account' subsection, which, of course, needs authentication, here are login credentials:

| Role     | Login         | Password |
|----------|---------------|----------|
| Customer | qweqwe@qwe.pl | qweqwe   |

## What are its most important features?

1. It uses Strapi for its backend, where administrator could add products and manage sale history.
    - Any information needed from backend is transferred using GraphQL.
    - Data is secure, being transferred over https and using password.

2. User login is similiarly secured, user credentials are being kept on backend database and retrieved through strapi/graphql.

3. Cart, checkout, product pages, product categories listing:
    - those functionalities are implemented,
    - they all work as one would expect of an online store

## What technologies did you use?

    - React / Next.js
    - TypeScript
    - Tailwind CSS
    - Strapi / graphQL

## Running the app

1. Create .env.local file in the root folder. Following variables are needed:
    - API_TOKEN: access token for STRAPI,
    - JWT_SECRET: secret key for JWT,
    - HOST_URL IS SET IN (LIB)/GLOBALS as a variable, because otherwise vercel was not reading it.