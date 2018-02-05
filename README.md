# How to run

## Download and install _Nodejs_

1. Download [nodejs & npm](https://nodejs.org/en/download/) and install.
1. Test installation with `node --version` resp. `npm --version` .
1. Update package manager with `npm install --globally npm@latest`

## Download and install _yarn_

1. Download [yarn](https://yarnpkg.com/en/docs/install) and install.
  _Yarn_ is an alternative to the _npm_ package manager.
1. Test installation with `yarn --version`.

## Download and build project

1. `git clone https://github.com/ges0909/empChart.git`
1. `cd empChart/`
1. `git checkout develop`
1. Fetch all package dependencies by executing command `yarn`.
1. `npx eslint --init`
1. `yarn build`
1. Provide data (not stored on _Github_).
1. Start http server with command `yarn  start`
1. Open in browser
   - [story_1_1.html](http://localhost:9999/story_1_1.html)
   - [story_1_4.html](http://localhost:9999/story_1_4.html)
   - [story_1_5.html](http://localhost:9999/story_1_5.html)
   - [story_1_6.html](http://localhost:9999/story_1_6.html)
   - [story_1_6_1.html](http://localhost:9999/story_1_6_1.html)
   - [story_2_1.html](http://localhost:9999/story_2_1.html)
   - [story_2_2.html](http://localhost:9999/story_2_2.html)

## Miscellaneous

- `npx eslint --fix **/js/*.js`
- `webpack -p` # minifies assets
