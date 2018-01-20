# How to run?

## Download and install "nodejs"

1. Download [nodejs & npm](https://nodejs.org/en/download/) and install.
3. Test installation with `node --version` resp. `npm --version` .
4. Update package manager with `npm install --globally npm@latest`

## Download and install "yarn"

1. Download [yarn](https://yarnpkg.com/en/docs/install) and install it.
  `Yarn` is an alternative to the `npm` package manager.
2. Test installation with `yarn --version`.

## Download and build project

1. `git clone https://github.com/ges0909/empChart.git`
2. `cd empChart/`
3. `git checkout develop`
4. `yarn`
5. `npx eslint --init`
6. `yarn run build`
7. Provide data ...
8. `yarn run start`
9. Open in browser [http://localhost:9999/story_1_1.html] .

## Miscellaneous

- `npx eslint --fix **/js/*.js`