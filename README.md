# Node Integration Tests

> An example of how to run integration tests on a node/express API with supertest and a postgres database running in docker

## Prerequisites

- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Postgres](https://www.postgresql.org/) (optional)

## `.env` and `.env.test`

Setup a `.env` file and a `.env.test` file each with a connection string varible `DB_CONNECTION_STRING`

```
DB_CONNECTION_STRING=postgresql://[username]:[password]@[network location]:[port]/[database name]
```

`.env` is used to connect to your locally installed postgres database while the API is running normally

```
# in .env file
DB_CONNECTION_STRING=postgresql://postgres:postgres@localhost:5432/tododb
```

`.env.test` is used to connect to a running docker container with a postgres image on a different port when running jest tests
(we will use this one when running the integration tests)

```
# in .env.test file
DB_CONNECTION_STRING=postgresql://postgres:postgres@localhost:5433/tododb
```

## Install Dependencies

```
npm install
```

## Running the API

Starts the API on localhost port 3000

```
npm start
```

## Running the tests

This will create a docker image, run a docker container, execute the tests and then stop and cleanup the docker container

```
npm test
```
