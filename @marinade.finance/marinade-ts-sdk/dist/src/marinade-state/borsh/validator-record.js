"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorRecordBorshSchema = exports.ValidatorRecord = void 0;
const common_1 = require("./common");
class ValidatorRecord {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.ValidatorRecord = ValidatorRecord;
exports.validatorRecordBorshSchema = [
    [ValidatorRecord, {
            kind: 'struct',
            fields: [
                ['validatorAccount', common_1.deserializePublicKey],
                ['activeBalance', 'u64'],
                ['score', 'u32'],
                ['lastStakeDeltaEpoch', 'u64'],
                ['duplicationFlagBumpSeed', 'u8'],
            ],
        }],
];
//# sourceMappingURL=validator-record.js.map