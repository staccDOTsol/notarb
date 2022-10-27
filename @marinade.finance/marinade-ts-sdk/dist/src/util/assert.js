"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNullAndReturn = void 0;
const assertNotNull = (arg, err = 'Asserted value is null!') => {
    if (arg === null) {
        throw new Error(err);
    }
};
const assertNotNullAndReturn = (arg, err = 'Asserted value is null!') => {
    assertNotNull(arg, err);
    return arg;
};
exports.assertNotNullAndReturn = assertNotNullAndReturn;
//# sourceMappingURL=assert.js.map