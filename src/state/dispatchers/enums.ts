import { Enum } from "../../models/enum";
import { ReduxAction } from "./base";

/**
 * Update the redux store with all the enums.
 *
 * This is executed after as part of kickoff.
 */
export interface SetEnumsAction extends ReduxAction {
  payload: Enum[];
}
export const setEnums = (enums: Enum[]): SetEnumsAction => {
  return { type: "SET_ENUMS", payload: enums };
};
