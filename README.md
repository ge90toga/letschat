This is an ionic project uses Firebase as real-time data service 
with facebook login allowing users to enjoy one to one chat for personal tech learning and fun. 


## Specification

The project is intended to follow a small specification I made from [specification](www/spec.md).

This project is based on my other repository [chatlover](https://bitbucket.org/GE90TOGA/chatlover), the reason 
why I started this new project is simply because I was at the very beginning stage of understanding ionic, npm bower gulp...
management when I did the my first chatlover project, therefore I only version controlled my www folder leading to a very complex
restore procedure when I need to restore project and maintain my version control. And since I shared my previous project to others who I 
would not like to bother by structurally updating the whole project, I decided to make a "new" one. 

## Workflow
The `master` branch is protected (pushing to the branch is not possible). 
When done with a milestone, merge with a pull request.

## Project Setup

#### 1) Install ionic v1

Please follow https://ionicframework.com/docs/v1/getting-started/ to set up ionic on your computer.

#### 2) Initialise project
Replace YOURAPPNAME with your project name
```bash
git clone https://bitbucket.org/GE90TOGA/chatapp YOURAPPNAME
cd YOURAPPNAME
npm install
bower install
ionic state restore --plugins
```

## Run
Use ionic serve to view it in browser
```bash
ionic serve -c
```

For iOS:
```bash
ionic platform remove ios // remove the platform if you have compile issue
ionic platform add ios
ionic build ios
ionic emulate ios
```

For Android:
```bash
ionic platform remove android
ionic platform add android
ionic build android
ionic emulate android
```
## Testing
The project is currently under development of unit-testing. 
To use unit testing, install the following package:
```bash
npm install karma karma-jasmine karma-phantomjs-launcher --save-dev
npm install -g karma-cli
npm install
bower install angular-mocks --save-dev
npm install jasmine-core --save-dev
```
To run test, execute:
```bash
karma start tests/test.conf.js
```

## Firebase
