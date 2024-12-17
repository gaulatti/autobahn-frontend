import { ReduxAction } from '../dispatchers/base';
import defaultStore, { State } from '../store';

/**
 * Reducer function for the lifecycle state.
 *
 * @param state - The current state.
 * @param action - The Redux action.
 * @returns The updated state.
 */
const lifecycleReducer = (state: State = defaultStore, action: ReduxAction) => {
  switch (action.type) {
    case 'SET_KICKOFF_READY':
      return {
        ...state,
        kickoffReady: true,
      };
    default:
      return state;
  }
};

export { lifecycleReducer };
