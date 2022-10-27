/**
 * Calculates the due date information for a ticket.
 *
 * @param {number} currentEpoch
 * @param {number} createdEpoch
 * @param {number} avgSlotDuration
 */
import { ProcessedEpochInfo } from "./anchor.types";
import { TicketDateInfo } from "./ticket-date-info.types";
export declare function getTicketDateInfo(currentEpoch: ProcessedEpochInfo, createdEpochNumber: number, currentTime?: number): TicketDateInfo;
export declare function estimateTicketDateInfo(currentEpoch: ProcessedEpochInfo, currentTime: number | undefined, slotsForStakeDelta: number): TicketDateInfo;
