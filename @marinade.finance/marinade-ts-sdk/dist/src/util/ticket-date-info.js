"use strict";
/**
 * Calculates the due date information for a ticket.
 *
 * @param {number} currentEpoch
 * @param {number} createdEpoch
 * @param {number} avgSlotDuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateTicketDateInfo = exports.getTicketDateInfo = void 0;
// https://docs.marinade.finance/marinade-protocol/system-overview#delayed-unstaked
const EXTRA_WAIT_MILLISECONDS = 1000 * 60 * 45;
// Compute due date for an existing ticket
function getTicketDateInfo(currentEpoch, createdEpochNumber, currentTime = Date.now()) {
    const currentEpochStart = currentTime - currentEpoch.msElapsed;
    const estimatedEpochDuration = currentEpoch.avgSlotDuration * currentEpoch.slotsInEpoch;
    const dueDate = currentEpochStart -
        estimatedEpochDuration * (currentEpoch.epoch - createdEpochNumber - 1) + EXTRA_WAIT_MILLISECONDS;
    return { ticketDue: dueDate < currentTime, ticketDueDate: new Date(dueDate) };
}
exports.getTicketDateInfo = getTicketDateInfo;
// Estimate due date if a ticket would be created right now
function estimateTicketDateInfo(currentEpoch, currentTime = Date.now(), slotsForStakeDelta) {
    const currentEpochEnd = currentTime + currentEpoch.msUntilEpochEnd;
    const estimatedEpochDuration = currentEpoch.avgSlotDuration * currentEpoch.slotsInEpoch;
    // if we're already inside the window where the bot stakes (last x slots in the epoch), 
    // the ticket will have to wait one more epoch
    const dueDate = currentEpochEnd
        + (currentEpoch.slotsRemainingInEpoch <= slotsForStakeDelta ? estimatedEpochDuration : 0)
        + EXTRA_WAIT_MILLISECONDS;
    return {
        ticketDue: false,
        ticketDueDate: new Date(dueDate),
    };
}
exports.estimateTicketDateInfo = estimateTicketDateInfo;
//# sourceMappingURL=ticket-date-info.js.map