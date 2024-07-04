import { User } from '../../models/user';
import { ReduxAction } from '../dispatchers/base';
import defaultStore, { State } from '../store';

const authReducer = (state: State = defaultStore, action: ReduxAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: { ...state.auth, currentUser: action.payload as User, loaded: true },
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: { ...state.auth, currentUser: undefined, loaded: false },
      };

    case 'SET_CURRENT_USER':
      return {
        ...state,
        auth: { ...state.auth, currentUser: action.payload as User, loaded: true },
      };
    default:
      return state;
  }
};

export { authReducer };
