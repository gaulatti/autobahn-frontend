import { Card, CardHeader, Body1, Caption1, CardPreview, CardFooter, Button, Title2, Label, Input, Spinner, Select } from '@fluentui/react-components';
import { AddFilled } from '@fluentui/react-icons';
import { useCallback, useState } from 'react';
import { Method, sendRequest } from '../../clients/api';
import { useNavigate } from 'react-router-dom';
import { getCurrentTeam, getTeams } from '../../state/selectors/teams';
import { useSelector } from 'react-redux';

const Trigger = () => {
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

      sendRequest(Method.POST, 'executions', { url: formElements.url.value, team: formElements.team.value }).then(() => {
        navigate('/executions');
        setIsLoading(false);
      });
    },
    [navigate, setIsLoading]
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
