# Elecshop - eCommerce app w/ Next.js, Nest.js and MongoDB

![Elecshop preview image](./client/public/design/preview.png)

## The Challenges ⚡️

This is a project that i have copied from the (https://github.com/NightClover-code) and i'm trying trying to add more functionalities and capabilities and then publish it on a host.

some of the challenges are :
- using a sms provider for otp authentication
- using redis for caching the otp codes
- adding a payment interface
- dockerizing the project

## Built With ✨

- [Nest.js](https://nestjs.com/) - node.js framework
- React Bootstrap - UI library
- Redux - State management library
- JWT - tokens for authentication
- [Next.js](https://nextjs.org/) - react.js framework
- MongoDB - Document database
- Typescript

## Running Locally 🖥️

Clone the project

```bash
git clone https://github.com/s4j4d/ecommerce-nestjs-mongo
```

Go to the project directory

```bash
cd modern-ecommerce
```

Remove remote origin

```bash
git remote remove origin
```

Install dependencies - Client

```bash
yarn install
```

Install dependencies - Server

```bash
yarn install
```

Add Environment Variables - Client

<details>
  <summary>Click to expand!</summary>
  
  - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
</details>

Add Environment Variables - Server

<details>
  <summary>Click to expand!</summary>
  
  - `MONGODB_PASSWORD`
  - `MONGODB_DATABASE_NAME` 
  - `JWT_SECRET`
  - `MONGODB_URL` 
  - `SESSION_KEY`
  - `CLIENT_URL`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CLOUDINARY_NAME`
</details>

Start the server

```bash
yarn start:dev
```

Start the client

```bash
yarn dev
```

## Deployment 🚀
 - Client deployed on [Vercel](https://vercel.com/)
 - Server deployed on [Railway](https://railway.app/)
 
 
## Inspiration & credits ☄️
 - [@achrafdev](https://achrafdev.com)

## Author
- [@s4j4d]

**Thanks for sharing** 🚀

