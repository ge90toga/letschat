This is an ionic project uses firebase as realtime data service 
with facebook login allowing users to enjoy one to one chat. 


## Specification

The project is intended to follow specification from [specification](www/spec.md).

## Workflow
The `master` branch is protected (pushing to the branch is not possible). 
When done with a milestone, merge with a pull request.

## Project Setup

#### 1) Install ionic v1

Please follow https://ionicframework.com/docs/v1/getting-started/ to set up ionic on your computer.

#### 2) Initialise project
```bash
$ ionic start chatlover blank
$ cd chatlover
$ git init
$ git remote add origin https://bitbucket.org/GE90TOGA/chatlover
$ git fetch --all
$ git reset --hard origin/master
```

## Run
For iOS:
```bash
ionic platform add ios
ionic build ios
ionic emulate ios
```

For Android:
```bash
ionic platform add android
ionic build android
ionic emulate android
```

## Firebase