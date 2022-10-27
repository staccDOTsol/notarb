"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stakeRecordBorshSchema = exports.StakeRecord = void 0;
const common_1 = require("./common");
class StakeRecord {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.StakeRecord = StakeRecord;
exports.stakeRecordBorshSchema = [
    [StakeRecord, {
            kind: 'struct',
            fields: [
                ['stakeAccount', common_1.deserializePublicKey],
                ['lastUpdateDelegatedLamports', 'u64'],
                ['lastUpdateEpoch', 'u64'],
                ['isEmergencyUnstaking', 'u8'],
            ],
        }],
];
//# sourceMappingURL=stake-record.js.map