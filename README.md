<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Transactions App</h1>

[![Página inicial da aplicação][product-screenshot]](#)

  <p align="center">
    Upload transactions to App
    <br />
    <a href="/DOCUMENTATION/CHALLENGE.md">Challenge</a>
    ·
    <a href="/DOCUMENTATION/CHALLENGE.md">Roadmap</a>
  </p>
</div>

## About The Project

An application that allows the upload of transactions file of products sold to normalize the data and store them in a relational database. Some features:

- Details of the products
- Details of the transactions
- Analytics

Use the file [sales.txt](DOCUMENTATION/sales.txt) to upload.

### Built With

- [NextJS](https://nextjs.org/)
- [tRPC.io](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [PostgresSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-hook-form](https://react-hook-form.com/)
- [NextAuth](https://next-auth.js.org/)

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

#### Production

Prerequisites

- Docker
- docker-compose

1. Copy `.env.example` to `.env` and configure if necessary.
2. Run `docker-compose up -d`
3. Running on `localhost:80` ✨

Admin account:

- Username: admin
- Password: admin@123

#### Development

Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) or use [docker container](https://hub.docker.com/_/postgres) 🙏

1. Copy `.env.example` to `.env` and configure if necessary.
2. `yarn` or `npm install`
3. `yarn prisma generate`
4. `yarn prisma migrate deploy`
5. `yarn prisma db seed` (create admin account)
6. Running... ✨

Admin account:

- Username: admin
- Password: admin@123

## Roadmap

1. [x] Make a screen (by forms) to upload the file
2. [x] Make the parsing of the received file, normalize the data and store them in a relational database, following the file interpretation settings
3. [x] Show a list of product transactions imported by producer/affiliate, with a totalizer of the value of the transactions carried out
4. [x] Treat the backend errors, and report messages of friendly erros in frontend.

More details and stages of the roadmap can be accessed at [ROADMAP.md](DOCUMENTATION/ROADMAP.md)

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a [Pull Request](https://github.com/kjkGustavo/transactions/pulls)

## Contact

Gustavo Lima - [@kjkGustavo](https://twitter.com/kjkGustavo) - contato@gustavolima.dev

Project Link: [https://github.com/kjkGustavo/transactions](https://github.com/kjkGustavo/transactions)

[product-screenshot]: DOCUMENTATION/images/dashboard.png
