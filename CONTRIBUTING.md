# Contribution Guidelines

If you read this, first of all, thank you! It means a lot.

# Issues

A minimal reproduction of the issue is very recommended for us to fix your bug
as soon as possible.

## Getting started

1. Fork and clone the repository
1. Install dependencies with `pnpm install`
1. Start the development environment with `pnpm dev`

## Proposing changes

1. Do your changes. Please add tests if possible.
1. Commit.
1. Run `pnpm changeset` to create a changeset.
1. Submit the PR.

## Testing

To run the test suite, you can run `pnpm test` from the root of the repository.

If you propose changes, we highly recommend you to add some tests that covers
your changes or feature.

## Publishing

> 💡 This is mostly for maintainers

Run `pnpm publish-packages` to publish the package.
