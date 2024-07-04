import { UnknownAction } from 'redux-saga';

export interface ReduxAction extends UnknownAction {
  type: string;
  payload?: unknown;
}
