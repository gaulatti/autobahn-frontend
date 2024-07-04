import { State } from "../store";

const getKickoffReady = (state: State): boolean => {
  return !!state.kickoffReady;
};

export { getKickoffReady };
