import { State } from "../store";
import { ReduxAction } from '../dispatchers/base';

export interface Reducer {
  action: string;
  handler: (state: State, action: ReduxAction) => State;
}
