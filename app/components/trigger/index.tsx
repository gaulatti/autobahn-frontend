import { Button, Flex, Heading, Spinner, Text } from '@radix-ui/themes';
import { RiSearchLine } from '@remixicon/react';
import { Card, TextInput } from '@tremor/react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
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
      sendRequest(Method.POST, 'pulses', { url: formElements.url.value, teamId: currentTeam.id }).then((data: { url: string }) => {
        /**
         * Redirect to executions page after triggering execution
         */
        navigate(`/urls/${data.url}`);
        setIsLoading(false);
      });
    },
    [navigate, currentTeam]
  );

  return currentTeam && (
    <form onSubmit={handleSubmit}>
      <Card className='w-full my-4'>
        <Flex direction='column' gap='3'>
          <Heading as='h2'>Trigger Ad-Hoc Pulse</Heading>
          <Text as='label' size='2'>
            This will execute Lighthouse against a user-specified URL
          </Text>
          <TextInput id='url' className='my-4' icon={RiSearchLine} required placeholder='Website URL...' onInput={sanitizeUrl} />
          <Flex justify='between' className='w-full'>
            <Button type='submit'>Trigger</Button>
            {isLoading && <Spinner size='3' />}
          </Flex>
        </Flex>
      </Card>
    </form>
  );
};

export { Trigger };
