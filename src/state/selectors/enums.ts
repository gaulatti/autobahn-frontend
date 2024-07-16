import { State } from "../store";

const getEnumValues = (state: State, enumName: string): string[] => {
  return state.enums
    .filter((item) => item.name === enumName)
    .flatMap((item) => item.enumValues)
};

const getStatuses = (state: State): string[] => {
  return getEnumValues(state, "Status");
};

export { getStatuses };
