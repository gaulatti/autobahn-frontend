import { ReduxAction } from "../dispatchers/base";
import { SetEnumsAction } from "../dispatchers/enums";
import defaultStore, { State } from "../store";
import { Reducer } from "./base";

const setEnumsReducer = (state: State, action: SetEnumsAction): State => {
  return {
    ...state,
    enums: action.payload,
  };
};

const reducerCatalog: Reducer[] = [
  { action: "SET_ENUMS", handler: setEnumsReducer },
];

export const enumsReducer = (
  state: State = defaultStore,
  action: ReduxAction
) => {
  const handler = reducerCatalog.find((i) => i.action === action.type)?.handler;

  return handler ? handler(state, action) : state;
};
