# How to contribute to nx-trumbitta

Thank you, thank you so much 🙏 for your interest in contributing to this repository!

This is a container of [@nrwl/nx](https://nx.dev) plugins I decided or needed to write.  
At the time of writing, the only available plugin is [`nx-plugin-openapi`](packages/nx-plugin-openapi).

## Which kind of contributions can I... contribute?

You can contribute new features, add or update docs, fix or submit new issues, share feedback, basically anything you feel like contributing.

## Ok but what if I want to propose a new feature or fix some bug

Well, go on and open a pull request!  
But for me to feel comfortable accepting your code in my codebase, you'll need some tools:

* Some way of beautifying your code with [Prettier](https://prettier.io/), using [the configuration file provided in this repository](.prettierrc)
* An IDE / code editor with an active [EditorConfig](https://editorconfig.org/) extension, using [the configuration file provided in this repository](.editorconfig)
* [Commitizen](https://github.com/commitizen/cz-cli#using-the-command-line-tool) for your commit messages
* Node 12 (but this might change in the future), and I really need to find 5 minutes to add a `.nvmrc` to this repository. Please, open a PR if there's still none when you are reading this!

Then, do your thing and make sure you code doesn't break any test.

```sh
# Unit tests
nx affected:test --base=main

# E2e tests
nx affected:e2e --base=main
```

Speaking of which, if you are contributing to [`nx-plugin-openapi`](packages/nx-plugin-openapi), you can test it by following [the official guide](https://nx.dev/latest/angular/nx-plugin/overview#testing-your-plugin).  
The gist of the thing is you first run:

```sh
nx e2e nx-plugin-openapi-e2e
```

And this will run the test suite but it will also create a working Nx workspace in `tmp/nx-e2e/proj` where you can run commands and fiddle with things.

Also please add new test cases if you are adding new features, or a test case specific for the bug you are fixing so that we can be reasonably safe against regressions.
