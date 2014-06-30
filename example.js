console.log('output should only get to 4');
var more = new (require('./index'))({
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

[1,2,3,4,5,6,7].forEach(function (n) {
    more.write(n);
});

more.setGoal(3);
