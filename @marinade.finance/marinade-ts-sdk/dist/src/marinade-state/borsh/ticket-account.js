"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketAccountBorshSchema = exports.TicketAccount = void 0;
const common_1 = require("./common");
class TicketAccount {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.TicketAccount = TicketAccount;
exports.ticketAccountBorshSchema = [
    [TicketAccount, {
            kind: 'struct',
            fields: [
                ['stateAddress', common_1.deserializePublicKey],
                ['beneficiary', common_1.deserializePublicKey],
                ['lamportsAmount', 'u64'],
                ['createdEpoch', 'u64'],
            ],
        }],
];
//# sourceMappingURL=ticket-account.js.map