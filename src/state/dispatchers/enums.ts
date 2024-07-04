import { Enum } from '../../models/enum';
import { ReduxAction } from './base';

/**
 * Update the redux store with all the enums.
 *
 * This is executed after as part of kickoff.
 */
export const setEnums = (enums: Enum[]): ReduxAction => {
  return { type: 'SET_ENUMS', payload: enums };
};
