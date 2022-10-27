var LOGGING_ENABLED = process.env.NODE_ENV === 'development';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (LOGGING_ENABLED) {
        console.log.apply(console, args);
    }
};
