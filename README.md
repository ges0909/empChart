# Node.js & npm

## global vs. local

- install globally if running from command line
- globally is stored in C:\Program Files\nodejs\node_modules
- install locally f access with require() is needed
- locally is stored in ./node_modules/.bin/webpack

1. download: https://nodejs.org/en/download/
2. node --version
3. npm --version
4. npm install --globally npm@latest

# yarn & webpack

- with '--save-dev' . '--dev'  package will appear in your 'devDependencies' of 'package.json'

1. npm install --save-dev --globally yarn
2. yarn add webpack --dev              ### => npm install --save-dev webpack
3. yarn add copy-webpack-plugin --dev  ### => npm install --save-dev copy-webpack-plugin

- https://medium.com/netscape/bye-bye-bower-or-how-to-migrate-from-bower-to-npm-and-webpack-4eb2e1121a50

# install project dependencies

1. yarn
2. npx webpack --config webpack.config.js

# http-server

1. npm install --globally http-server 
2. http-server -p 9999
