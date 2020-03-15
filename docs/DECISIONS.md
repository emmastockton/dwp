# Decisions

## Server

Node & Express were chosen due to the familiarity, performance, community and resources available, including various npm packages which could be used as part of this task. A Swagger Server implementation was considered, but deemed to be over-complicated for an API with such a simple endpoint. It may prove to be more useful in the event of added complexity.

Swagger was considered for HTTP requesting, but was deemed to be more complex than was needed.

`request` (deprecated), `axios` and `whatwg-fetch` were considered before deciding on `superagent` due to it's simplicity and comprehensive docs.

## Caching

`superagent-cache` is a simple wrapper for `superagent` which provides many caching mechanisms for caching calls to the upstream API.

In-memory was chosen for this service, however a de-centralised option such as Redis was considered. Redis would provide better scalability but given the simplicity of this example it was deemed over-kill.

Simple cache-control headers were used to enable this service to be cached by possible clients.

## Testing

For unit testing, `Jest` was chosen as the idiomatic JavaScript test runner. It was preferred to `Mocha` for reasons of familiarity, community resources & documentation.

`Stryker` was added to provide mutation testing. Alongside Jest's code-coverage checks, mutation testing gives the additional benefit of ensuring tests are of a good quality.

Both `Jest` and `Stryker` are run as part of the deployment process (see CI)

## Development

`eslint` & `prettier` were chosen for linting and formatting, due to familiarity & ease of set-up. They are run as part of the deployment process to maintain best practice and have good compatibility with most code editors.

## CI

GitHub Actions has been chosen for CI, as it is a simple and easy to use pipeline which works nicely with code already hosted on GitHub.

For hosting, Heroku was chosen due to being easy to set-up. Heroku will wait for the pipeline to pass before deploying. This allows the service to be run in a production-like environment and helps with demonstrations.
