import { ReduxAction } from "./base";

const setKickoff = (): ReduxAction => {
  return { type: "KICKOFF" };
};

const setKickoffReady = (): ReduxAction => {
  return { type: "SET_KICKOFF_READY" };
};

export { setKickoff, setKickoffReady };
