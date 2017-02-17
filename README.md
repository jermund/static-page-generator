# Static page generator

Basic setup for static pages with jquery and foundation 6. 

## Setup

Pull repo and run `sudo npm start` to pull dev-dependencies and youare ready to go!

### Tools

Run `gulp` to fire up local sever. Uses browsersync for watching and live-reloading. All dependencies and scripts must be defined in `gulpfile.js`. 

Development tasks:

* `gulp` - default development task. Runs `server, sass, js-lib, js-lint`
* `gulp server` - runs browserSync and watch tasks
* `gulp sass` - compile sass
* `gulp lint-js` - lint files defined in js.scripts
* `gulp build-js-dependencies` - build js dependencies defined in js.dependencies
* `gulp build-js` - build js dependencies defined in js.dependencies

Production tasks:

* `gulp clean` - empty public folder
* `gulp copy-html` - copy files to public
* `gulp copy-css` - copy files to public
* `gulp copy-js` - copy files to public
* `gulp copy-images` - copy files to public
* `gulp copy-files` - run tasks sequential
* `gulp production` - temp copy-files alias