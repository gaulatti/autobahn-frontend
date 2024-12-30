import { Select } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTeam } from '../../state/dispatchers/teams';
import { getCurrentTeam, getTeams } from '../../state/selectors/teams';

/**
 * Renders a team selector component.
 *
 * @returns The rendered team selector component.
 */
const TeamSelector = () => {
  /**
   * Represents the current team.
   */
  const currentTeam = useSelector(getCurrentTeam)!;

  /**
   * Represents the teams available to the user.
   */
  const teams = useSelector(getTeams);

  /**
   * Represents the dispatcher function to dispatch actions to the store.
   */
  const dispatch = useDispatch();

  return currentTeam && (
    <Select.Root
      defaultValue={currentTeam.id.toString()}
      onValueChange={(e) => {
        dispatch(setCurrentTeam(Number(e)));
      }}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Team</Select.Label>
          {teams.map((team) => (
            <Select.Item key={team.id} value={team.id.toString()}>
              {team.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export { TeamSelector };
