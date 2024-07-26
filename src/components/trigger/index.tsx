import { Card, CardHeader, Body1, Caption1, CardPreview, CardFooter, Button, Title2, Label, Input, Spinner } from '@fluentui/react-components';
import { AddFilled } from '@fluentui/react-icons';
import { useCallback, useState } from 'react';
import { Method, sendRequest } from '../../clients/api';
import { useNavigate } from 'react-router-dom';

const Trigger = () => {
  const navigate = useNavigate();
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
      };

      sendRequest(Method.POST, 'executions', { url: formElements.url.value }).then(() => {
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
          <Button type='submit' icon={<AddFilled fontSize={16} />}>
            Trigger
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export { Trigger };
