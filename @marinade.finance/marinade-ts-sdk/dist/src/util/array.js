"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bounds = void 0;
const bounds = (index, itemSize, offset = 0) => [
    offset + index * itemSize,
    offset + (index + 1) * itemSize,
];
exports.bounds = bounds;
//# sourceMappingURL=array.js.map