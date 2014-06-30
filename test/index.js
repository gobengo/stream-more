var More = require('stream-more');
var assert = require('chai').assert;
var sinon = require('sinon');
var WritableArray = require('stream-arrays').WritableArray;

describe('stream-more', function () {
    it('holds onto written input', function (done) {
        var more = new More({ objectMode: true });
        var onMoreHold;
        var onMoreEnd;
        more.on('hold', onMoreHold = sinon.spy());
        more.on('end', onMoreEnd = sinon.spy());

        var output = new WritableArray();
        output.on('finish', function () {
            assert.equal(onMoreHold.callCount, 2);
            assert.equal(onMoreEnd.callCount, 1);
            assert.equal(output.get().length, things.length);    
            assert.equal(output.get()[2], things[2]);    
            done();
        });

        more.pipe(output);
        var things = [1,2,3,4,5];        
        things.forEach(function (thing) {
            more.write(thing);
        });

        // nothing got through yet, since setGoal was not called
        assert.equal(output.get().length, 0);

        more.end();
        more.setGoal(1);
        more.setGoal(50);
    });
    // idk why you would, but...
    it('works in non-objectMode', function (done) {
        var more = new More();
        var onMoreHold;
        var onMoreEnd;
        more.on('hold', onMoreHold = sinon.spy());
        more.on('end', onMoreEnd = sinon.spy());

        var output = new WritableArray();
        output.on('finish', function () {
            assert.equal(onMoreHold.callCount, 2);
            assert.equal(onMoreEnd.callCount, 1);
            assert.equal(output.get().length, things.length);    
            assert.equal(output.get()[2], things[2]);    
            done();
        });

        more.pipe(output);
        var things = ['1','2','3','4','5'];        
        things.forEach(function (thing) {
            more.write(thing);
        });

        // nothing got through yet, since setGoal was not called
        assert.equal(output.get().length, 0);

        more.end();
        more.setGoal(1);
        more.setGoal(50);
    });
});
