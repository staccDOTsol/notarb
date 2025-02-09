/// <reference types="bn.js" />
import { BN, web3 } from '@project-serum/anchor';
export interface ParsedStakeAccountInfo {
    ownerAddress: web3.PublicKey;
    authorizedStakerAddress: web3.PublicKey | null;
    authorizedWithdrawerAddress: web3.PublicKey | null;
    voterAddress: web3.PublicKey | null;
    activationEpoch: BN | null;
    deactivationEpoch: BN | null;
    isCoolingDown: boolean;
}
export interface ProcessedEpochInfo {
    epoch: number;
    slotIndex: number;
    slotsInEpoch: number;
    absoluteSlot: number;
    blockHeight?: number;
    transactionCount?: number;
    msUntilEpochEnd: number;
    msElapsed: number;
    epochProgress: number;
    avgSlotDuration: number;
    slotsRemainingInEpoch: number;
}
