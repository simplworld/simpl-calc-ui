# simpl-calc-ui - example single-player simulation frontend service.

## Python Setup (assumes Python >= 3.6, simpl-games-api and simpl-calc-model servers running)

    git clone git@learninglab.githost.io:lldev-team/simpl-calc-ui.git
    cd simpl-calc-ui
    mkvirtualenv simpl-calc-ui
    add2virtualenv .

    pip install -r requirements.txt
    ./manage.py migrate

## Run front end

    ./manage.py runserver 0.0.0.0:8000

If you need some serious debugging help, in {{cookiecutter.app_slug}}/templates/{{cookiecutter.app_slug}}/home.html set:

    var AUTOBAHN_DEBUG = true;

Which will turn on verbose debugging of the Autobahn/Websockets to help debug interactions between the browser and model service backend.
If you do this, do NOT commit this change.

### Gulp Setup (run gulp in a separate terminal outside Vagrant)

Install gulp and/or webpack globally outside Vagrant to ensure they are on your PATH

    sudo npm install --global webpack
    sudo npm install --global gulp

Update node_modules and run Gulp to compile JS and SASS

    cd to simpl-calc-ui directory
    npm install
    gulp

When you are running gulp with Mac OS, you may get an error like this:

    Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 4.x

If you get this error, run:

    npm rebuild node-sass

If you install Live Reload browser extension(s) from http://livereload.com/extensions/ and run gulp
your browser will automatically reload pages anytime the JS or a Django template changes.


## Run javascript unit tests (run outside Vagrant)

We use jest and enzyme for unit testing (see http://redux.js.org/docs/recipes/WritingTests.html)

    npm test

## Debugging WAMP subscriptions and registrations

Point your browser to http://localhost:8080/monitor and open your javascript console
