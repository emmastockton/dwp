# DWP

👩🏻‍💻**Author:** [Emma Stockton](https://github.com/emmastockton)

🚀Hosted on Heroku at https://emma-stockton-dwp.herokuapp.com/

## See also

- 💡[DECISIONS.md](docs/DECISIONS.md) - a catalog of design decisions made in this repo

## Endpoints

### `GET /`

Status endpoint (returns 200 OK)

### `GET /users`

Returns a list of users who are either listed as living in London or whose location is within 50 miles of London

## Requirements

- NodeJS (12)

Supports [nvm](https://github.com/nvm-sh/nvm), e.g. `nvm use`

## Setup

```
npm install
```

## Start the Service

```
npm start
```

Use the `PORT` environment variable to customise which port the service runs on, e.g. `PORT=8081 npm start`

## Run Tests

Run the unit tests:

```
npm test
```

Run mutation tests:

```
npm run test:mutation
```

## Linting

```
npm run lint
```

## Format using Prettier

```
npm run prettify
```
