import { ReduxAction } from '../dispatchers/base';
import defaultStore, { State } from '../store';

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
