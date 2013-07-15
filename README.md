# Bet on Soccer

## Description

Web-interface for bets on soccer tournament results with friends.


## Install

The first thing you have to do is setup the MYSQL access settings.
Copy the file `template/mysql.env` to `config/mysql.env` and adjust it to
your needs.

There is a `make` target for this purpose:

    make setup

**You should use an empty mysql database.**

Afterwards you need to create the tables to the database:

    make install


## Requirements

Server:

* PHP >= 5.4
* pecl-uuid ~ 1.0.3

Client:

* latest HTML5 support


## Maintenance

Is mainly performed via the web-interface.

For convenience there is a backup `make` target:

    make backup


# Based on: [angular-seed — the seed for AngularJS apps](https://github.com/angular/angular-seed)

### Running unit tests

We recommend using [jasmine](http://pivotal.github.com/jasmine/) and
[Karma](http://karma-runner.github.io) for your unit tests/specs, but you are free
to use whatever works for you.

Requires [node.js](http://nodejs.org/), Karma (`sudo npm install -g karma`) and a local
or remote browser.

* start `scripts/test.sh` (on windows: `scripts\test.bat`)
  * a browser will start and connect to the Karma server (Chrome is default browser, others can be captured by loading the same url as the one in Chrome or by changing the `config/karma.conf.js` file)
* to run or re-run tests just change any of your source or test javascript files


### End to end testing

Angular ships with a baked-in end-to-end test runner that understands angular, your app and allows
you to write your tests with jasmine-like BDD syntax.

Requires a webserver, node.js + `./scripts/web-server.js` or your backend server that hosts the angular static files.

Check out the
[end-to-end runner's documentation](http://docs.angularjs.org/guide/dev_guide.e2e-testing) for more
info.

* create your end-to-end tests in `test/e2e/scenarios.js`
* serve your project directory with your http/backend server or node.js + `scripts/web-server.js`
* to run do one of:
  * open `http://localhost:port/test/e2e/runner.html` in your browser
  * run the tests from console with [Karma](http://karma-runner.github.io) via
    `scripts/e2e-test.sh` or `script/e2e-test.bat`

## Directory Layout

    app/                --> all of the files to be used in production
      style/            --> css files
        default.css     --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      index-async.html  --> just like index.html, but loads js files asynchronously
      js/               --> javascript files
        app.js          --> application
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
      lib/              --> angular and 3rd party javascript libraries
        angular/
          angular.js        --> the latest angular js
          angular.min.js    --> the latest minified angular js
          angular-*.js      --> angular add-on modules
          version.txt       --> version number
      partials/             --> angular view partials (partial html templates)
        partial1.html
        partial2.html

    config/karma.conf.js        --> config file for running unit tests with Karma
    config/karma-e2e.conf.js    --> config file for running e2e tests with Karma

    scripts/            --> handy shell/js/ruby scripts
      e2e-test.sh       --> runs end-to-end tests with Karma (*nix)
      e2e-test.bat      --> runs end-to-end tests with Karma (windows)
      test.bat          --> autotests unit tests with Karma (windows)
      test.sh           --> autotests unit tests with Karma (*nix)
      web-server.js     --> simple development webserver based on node.js

    test/               --> test source files and libraries
      e2e/              -->
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      lib/
        angular/                --> angular testing libraries
          angular-mocks.js      --> mocks that replace certain angular services in tests
          angular-scenario.js   --> angular's scenario (end-to-end) test runner library
          version.txt           --> version file
      unit/                     --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services


# Authentication inspired by: [angular-client-side-auth](https://github.com/fnakstad/angular-client-side-auth)

One way to implement authentication/authorization in Angular applications.

Note: Twitter/Facebook/Google auth is enabled by default, but you can easily turn it off by commenting out the <code>passport.use()</code> statements in the [server.js](server.js) file.

* Blogpost: http://www.frederiknakstad.com/authentication-in-single-page-applications-with-angular-js/
* Live version: http://angular-client-side-auth.herokuapp.com/
