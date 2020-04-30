# Query Executor

For [Bradfield Databases course](https://bradfieldcs.com/courses/databases/).

## Usage

Install [deno](https://deno.land/).

```
brew install deno
```

Example usage with the [MovieLens 20M Dataset](https://grouplens.org/datasets/movielens/20m/):

```
deno --allow-read run.ts ../ml-20m/movies.csv
```

## Tests

Usage:

```
deno test ./test
```
