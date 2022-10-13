"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MARINADE_BORSH_SCHEMA = void 0;
const common_1 = require("./common");
const validator_record_1 = require("./validator-record");
const stake_record_1 = require("./stake-record");
const stake_state_1 = require("./stake-state");
const ticket_account_1 = require("./ticket-account");
// eslint-disable-next-line @typescript-eslint/ban-types
exports.MARINADE_BORSH_SCHEMA = new Map([
    ...common_1.commonBorshSchema,
    ...validator_record_1.validatorRecordBorshSchema,
    ...stake_record_1.stakeRecordBorshSchema,
    ...stake_state_1.stakeStateBorshSchema,
    ...ticket_account_1.ticketAccountBorshSchema,
]);
//# sourceMappingURL=marinade-borsh.js.map