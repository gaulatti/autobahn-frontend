import { Body1, Button, Caption1, Card, CardFooter, CardHeader, CardPreview, Input, Label, Select, Spinner, Title2 } from '@fluentui/react-components';
import { AddFilled } from '@fluentui/react-icons';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Method, sendRequest } from '../../clients/api';
import { getCurrentTeam, getTeams } from '../../state/selectors/teams';

/**
 * Represents a component that triggers the execution of Lighthouse against a user-specified URL.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setRefresh - The function to refresh the component.
 * @returns {JSX.Element} The rendered Trigger component.
 */
const Trigger = ({ setRefresh }: { setRefresh?: React.Dispatch<React.SetStateAction<number>> }): JSX.Element => {
  const navigate = useNavigate();
  const teams = useSelector(getTeams);
  const currentTeam = useSelector(getCurrentTeam)!;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const form = e.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        url: { value: string };
        team: { value: number };
      };

      /**
       * Send request to trigger execution
       */
      sendRequest(Method.POST, 'executions', { url: formElements.url.value, team: formElements.team.value }).then(() => {
        if (setRefresh) {
          setRefresh(new Date().getTime());
        } else {
          navigate('/executions');
        }
        setIsLoading(false);
      });
    },
    [navigate, setIsLoading, setRefresh]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card className='w-full my-4'>
        {isLoading && (
          <div className='spinner-overlay'>
            <Spinner size='huge' />
          </div>
        )}
        <CardHeader
          header={
            <Body1>
              <Title2>Trigger Execution</Title2>
            </Body1>
          }
          description={<Caption1>This will execute Lighthouse against a user-specified URL</Caption1>}
        />
        <CardPreview>
          <Body1 className='p-4'>
            <Label htmlFor='url' className='flex' size='small'>
              Website URL
            </Label>
            <Input id='url' type='url' required size='large' className='w-full' />
          </Body1>
        </CardPreview>
        <CardFooter>
          <section className='flex justify-between w-full'>
            <div>
              <Select id='team' defaultValue={currentTeam.id}>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </Select>
            </div>
            <Button type='submit' icon={<AddFilled fontSize={16} />}>
              Trigger
            </Button>
          </section>
        </CardFooter>
      </Card>
    </form>
  );
};

export { Trigger };
