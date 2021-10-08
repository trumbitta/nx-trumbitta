# Look for unused NPM dependencies in a Nx monorepo

[![NPM Version](https://badge.fury.io/js/%40trumbitta%2Fnx-plugin-unused-deps.svg)](https://www.npmjs.com/@trumbitta/nx-plugin-unused-deps)
[![License](https://img.shields.io/npm/l/@trumbitta/nx-plugin-unused-deps)]()

Check the dependency graph of your monorepo, looking for unused NPM packages.

## 🧐 What is it?

It's a plugin for cross checking the dependency graph of a Nx monorepo with its `package.json` and finding _seemingly_ unused NPM packages.

Add it to your postinstall script, wire it up into the linting phase of your CI pipeline, run it manually every once in a while... or let me know how you use it!

## 💡 How to install

```sh
npm install -D @trumbitta/nx-plugin-unused-deps
```

## 🧰 Usage

### Check for unused deps

```sh
nx generate @trumbitta/nx-plugin-unused-deps:check --no-interactive
```

### Log to JSON

```sh
nx generate @trumbitta/nx-plugin-unused-deps:check --json --no-interactive
```

### Fix the `package.json`

> ⛔️ **Heads up!**
>
> Use this command only when you are sure the unused deps are really unused.
> There could be something the dependency graph didn't catch for whatever reason.

```sh
nx generate @trumbitta/nx-plugin-unused-deps:check --fix --no-interactive
```

## 🙏 Acknowledgements

[Original code](https://www.youtube.com/watch?v=hlGOaGDsWKg&t=13713s) by Philip Fulcher @PhilipJFulcher.
