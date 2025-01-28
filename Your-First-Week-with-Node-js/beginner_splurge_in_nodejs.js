function add(a, b, callback) { var result = a + b; callback(result); }

// add(2, 3, function (c) { console.log('2 + 3 = ' + c) });

add(1, 1, function (c) { console.log('Is 1 + 1 = 3? ' + (c === 3)); });

// Asynchronous Operations
function doSomething (asyncCallback) { asyncCallback(); }
doSomething(function () { console.log('This runs synchronously.'); });

function doSomething (asyncCallback) { setTimeout(asyncCallback, Math.random()
    + 1000); }

doSomething(function () { console.log('This runs asynchronously.'); });
console.log('test');