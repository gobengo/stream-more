# stream-more

A Duplex stream inspired by the unix [more](http://en.wikipedia.org/wiki/More_(command)) command.

Pipe in a very long stream, and more will only let through a bit when you tell it to.

Real-world example: If you're looking at a feed of content in a Web Component, your upstream data stream may be a billion items long (or infinite). But you only want to let an initial number through. And when the user clicks 'show more', you want to let through N more, then hold again.

Backpressure ftw.

Note: This library is intended to work in both node and the browser.

## API

* More streams have a `.setGoal(number)` method that sets the goal of how much it should let through before holding
* they emit a `hold` event when they have data to emit, but aren't because their goal is 0. Call `.setGoal(N)` to continue letting data through

```javascript
// Construct like any other stream
var more = new require('stream-more')({
    objectMode: true,
    // initial goal to let through
    goal: 1
});
more.on('data', function (d) {
    console.log('more let through:', d);
});
more.on('hold', function () {
    console.log('more is holding');
});

// pipe a very long, high-velocity stream to more
// e.g. https://github.com/gobengo/stream-cycle
var infiniteStream = cycle([1,2,3]).pipe(more);
// more let through: 1
// more is holding

more.setGoal(3);
// more let through: 2
// more let through: 3
// more let through: 1
// more is holding
```

## `make` commands

* `make build` - will `npm install` and `bower install`
* `make dist` - will use r.js optimizer to compile the source, UMD wrap, and place that and source maps in dist/
* `make clean`
* `make server` - serve the repo over http
* `make deploy [env={*prod,uat,qa}]` - Deploy to lfcdn, optionally specifying a bucket env
