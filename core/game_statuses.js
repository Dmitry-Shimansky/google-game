/**
 * @typedef {Object} GameStatuses
 * @property {"pending"} PENDING - The game is created but not started.
 * @property {"in_progress"} IN_PROGRESS - The game is currently running.
 * @property {"completed"} COMPLETED - The game has finished.
 * @property {"paused"} PAUSED - The game is temporarily halted.
 */

/**
 * A set of string constants that represent the possible game statuses.
 * @type {GameStatuses}
 */
export const GameStatuses = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    PAUSED: 'paused',
};