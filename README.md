[![build status](https://secure.travis-ci.org/trongrg/bootstrap-limit.png?branch=master)](http://travis-ci.org/trongrg/bootstrap-limit)

[bootstrap-limit][gh-page]
=======================

Inspired by [twitter.com][twitter]'s tweet countdown functionality

Getting Started
---------------

* [Download zipball of latest release][zipball].
* Download latest *[bootstrap-limit.js][bootstrap-limit.js]* or *[bootstrap-limit.min.js][bootstrap-limit.min.js]*.

**Note:** bootstrap-limit has a dependency on [jQuery][jquery] 1.9+, which must be loaded before *bootstrap-limit*.

Examples
--------

For some working examples of bootstrap-limit, visit our [examples page][examples].

Features
--------

Usage
-----

### API

#### jQuery#bootstrap-limit

Turns any `input` or `textarea` element into a bootstrap-limit.

```javascript
$('input.limit').limit({
});
```

### Custom Events

bootstrap-limit triggers the following custom events:

* `bootstrap-limit:initialized` – Triggered after initialization. If data needs to be prefetched, this event will not be triggered until after the prefetched data is processed.

* `bootstrap-limit:crossed` – Triggered when the dropdown menu of a bootstrap-limit is opened.

* `bootstrap-limit:uncrossed` – Triggered when the dropdown menu of a bootstrap-limit is closed.

All custom events are triggered on the element initialized as a bootstrap-limit.

Browser Support
---------------

* Chrome
* Firefox 3.5+
* Safari 4+
* Internet Explorer 7+
* Opera 11+

Issues
------

Discovered a bug? Please create an issue here on GitHub!

https://github.com/trongrg/bootstrap-limit/issues

Versioning
----------

For transparency and insight into our release cycle, releases will be numbered with the follow format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on semantic versioning, please visit http://semver.org/.

Testing
-------

Tests are written using [Jasmine][jasmine]. To run the test suite with PhantomJS, run `$ grunt test`. To run the test suite in your default browser, run `$ grunt test:browser`.

Developers
----------

If you plan on contributing to bootstrap-limit, be sure to read the [contributing guidelines][contributing-guidelines].

In order to build and test bootstrap-limit, you'll need to install its dev dependencies (`$ npm install`) and have [grunt-cli][grunt-cli] installed (`$ npm install -g grunt-cli`). Below is an overview of the available Grunt tasks that'll be useful in development.

* `grunt build` – Builds *bootstrap-limit* from source.
* `grunt lint` – Runs source and test files through JSHint.
* `grunt test` – Runs the test suite with PhantomJS.
* `grunt test:browser` – Runs the test suite in your default browser.
* `grunt watch` – Rebuilds *bootstrap-limit* whenever a source file is modified.
* `grunt server` – Serves files from the root of bootstrap-limit on localhost:8888. Useful for using *test/playground.html* for debugging/testing.
* `grunt dev` – Runs `grunt watch` and `grunt server` in parallel.

Authors
-------

* **Trong Tran** ([GitHub](https://github.com/trongrg))

Shoutouts!
----------

Thanks for assistance and contributions:

* [And many others!][contributors]

License
-------

Copyright 2013 TrongTran, Inc.

Licensed under the MIT License

[twitter]: https://twitter.com
[gh-page]: http://trongrg.github.io/bootstrap-limit
[examples]: http://trongrg.github.io/bootstrap-limit/examples
[@bootstrap-limit]: https://trongrg.github.com/bootstrap-limit

<!-- assets -->
[zipball]: http://trongrg.github.io/bootstrap-limit/releases/latest/bootstrap-limit.zip

<!-- github links -->
[contributing-guidelines]: https://github.com/trongrg/bootstrap-limit/blob/master/CONTRIBUTING.md
[contributors]: https://github.com/trongrg/bootstrap-limit/contributors
[issues]: https://github.com/trongrg/bootstrap-limit/issues

<!-- deep links -->
[features]: #features

<!-- links to third party projects -->
[jasmine]: http://pivotal.github.com/jasmine/
[grunt-cli]: https://github.com/gruntjs/grunt-cli
[bower]: http://bower.io/
[jQuery]: http://jquery.com/
[bootstrap]: http://twitter.github.com/bootstrap/
