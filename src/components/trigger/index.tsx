import { Body1, Caption1, Card, CardFooter, CardHeader, CardPreview, Input, Label, Spinner, Title2 } from '@fluentui/react-components';
import { Button, Flex } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Method, sendRequest } from '../../clients/api';
import { getCurrentTeam } from '../../state/selectors/teams';

/**
 * Checks if the URL starts with 'http://' or 'https://'.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
const isValidHttpUrl = (url: string): boolean => {
  return /^(https?:\/\/)/i.test(url);
};

/**
 * Represents a component that triggers the execution of Lighthouse against a user-specified URL.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setRefresh - The function to refresh the component.
 * @returns {JSX.Element} The rendered Trigger component.
 */
const Trigger = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTeam = useSelector(getCurrentTeam)!;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Handle URL blur event to validate and correct the URL
   */
  const sanitizeUrl = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//i.test(e.target.value)) {
      /**
       * If the URL does not start with a valid protocol, prepend https://
       */
      e.target.value = `https://${e.target.value}`;
    }

    if (!isValidHttpUrl(e.target.value)) {
      e.target.setCustomValidity('Please enter a valid URL starting with http:// or https://');
    } else {
      e.target.setCustomValidity('');
    }
  }, []);

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

      /**
       * Send request to trigger execution
       */
      sendRequest(Method.POST, 'executions', { url: formElements.url.value, team: currentTeam.id }).then((data: { url: string }) => {
        /**
         * Redirect to executions page after triggering execution
         */
        navigate(`/stats/url/${data.url}`);
        setIsLoading(false);
      });
    },
    [navigate, currentTeam]
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
            <Input id='url' type='url' required size='large' className='w-full' onInput={sanitizeUrl} />
          </Body1>
        </CardPreview>
        <CardFooter>
          <Flex justify='between' className='w-full'>
            <Button type='submit'>Trigger</Button>
          </Flex>
        </CardFooter>
      </Card>
    </form>
  );
};

export { Trigger };
