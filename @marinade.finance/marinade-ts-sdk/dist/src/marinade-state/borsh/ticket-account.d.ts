import { web3 } from '@project-serum/anchor';
import { deserializePublicKey } from './common';
import BN from 'bn.js';
export declare class TicketAccount {
    stateAddress: web3.PublicKey;
    beneficiary: web3.PublicKey;
    lamportsAmount: BN;
    createdEpoch: BN;
    ticketDue?: boolean;
    ticketDueDate?: Date;
    constructor(args: TicketAccount);
}
export declare const ticketAccountBorshSchema: readonly [readonly [typeof TicketAccount, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["stateAddress", typeof deserializePublicKey], readonly ["beneficiary", typeof deserializePublicKey], readonly ["lamportsAmount", "u64"], readonly ["createdEpoch", "u64"]];
}]];
