# gulp-ember-emblem [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]

This is a gulp plugin to process [Emblem.js](http://emblemjs.com) templates specifically for [Ember](http://emberjs.com/).

## Usage

First, install _gulp-ember-emblem_ and [gulp-define-module] as development dependencies:

```shell
npm install --save-dev gulp-ember-emblem gulp-define-module
```

Then, add it to your `gulpfile.js`:

```javascript
var emberEmblem = require('gulp-ember-emblem');
var defineModule = require('gulp-define-module');

gulp.task('templates', function(){
  gulp.src(['client/templates/*.hbs'])
    .pipe(emberEmblem())
    .pipe(defineModule('node'))
    .pipe(gulp.dest('build/templates/'));
});
```

gulp-ember-emblem outputs a raw handlebars function, so it is likely that you will want to use [gulp-define-module] to make the handlebars template available via a specific namespace or for use with a module system. For additional usage examples, we recommend that you visit [gulp-handlebars] and [gulp-define-module].


## Compiling to various module systems

[gulp-define-module] can be used to prepare the output for use with common module systems such as AMD, Node, and CommonJS. Please see the documentation for more details on how to use that in a gulp chain.

gulp-ember-emblem makes the following available for use in the [define-module wrapper](https://github.com/wbyoung/gulp-define-module#optionswrapper):

 - `emberHandlebars`: The handlebars template fully wrapped (`Ember.Handlebars.template(<%= contents %>)`).


## API

### emberEmblem(options)

#### options.compilerOptions
Type: `Object`

Compiler options to pass to `Emblem.precompile()`.


[travis-url]: http://travis-ci.org/wbyoung/gulp-ember-emblem
[travis-image]: https://secure.travis-ci.org/wbyoung/gulp-ember-emblem.png?branch=master
[npm-url]: https://npmjs.org/package/gulp-ember-emblem
[npm-image]: https://badge.fury.io/js/gulp-ember-emblem.png

[gulp-define-module]: https://github.com/wbyoung/gulp-define-module
[gulp-handlebars]: https://github.com/lazd/gulp-handlebars
