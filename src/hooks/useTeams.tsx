import { Team } from "../models/team";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getTeams } from "../state/selectors/teams";

/**
 * Teams. Elemental organizational unit,
 * parent of everything and mother of dragons.
 */
const useTeams = () => {
  /**
   * Get Teams from Redux.
   *
   * They should have been initialized as part
   * of the kickoff workflow.
   */
  const teams = useSelector(getTeams);

  /**
   * Get the current team.
   */
  const currentTeam = useMemo((): Team | undefined => {
    return teams.find((f) => f.selected);
  }, [teams]);

  return { teams, currentTeam };
};

export { useTeams };
