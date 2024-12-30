import { Button, Dialog, Flex, Heading, Select, Text, TextField } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { Method, sendRequest } from '../../../clients/api';
import { useSelector } from 'react-redux';
import { getEnums } from '../../../state/selectors/enums';

/**
 * CreateTarget component renders a dialog for creating a new target.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.callback - A callback function to be called after the form submission.
 *
 * @returns {JSX.Element} The rendered CreateTarget component.
 *
 * @component
 *
 * @example
 * // Usage example:
 * <CreateTarget callback={() => console.log('Form submitted')} />
 *
 * @remarks
 * This component uses a dialog to present a form for creating a new target.
 * The form includes a text field for the target URL and buttons to cancel or save the form.
 * On form submission, a POST request is sent to the `targets` endpoint with the target URL.
 * The dialog's open state is managed using a useState hook.
 */
const CreateTarget = ({ callback }: { callback: () => void }) => {
  /**
   * Represents the open state of the dialog.
   */
  const [open, setOpen] = useState(false);

  /**
   * Represents the enums object.
   */
  const enums = useSelector(getEnums);

  /**
   * Represents the selected target.
   */
  const [stage, setStage] = useState<string | null>(null);

  /**
   * Handles the form submission.
   */
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        name: { value: string };
        target: { value: string };
      };

      sendRequest(Method.POST, `targets`, { name: formElements.name.value, target: formElements.target.value, stage }).then(() => {
        if (callback) {
          callback();
        }
      });
    },
    [callback, stage]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Create Target</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth='450px'>
        <Heading as='h2'>Create Target</Heading>
        <Dialog.Description size='2' mb='4' mt='2'>
          Any new target will be immediatelly available for scheduling and baselines. <br />
          <small>Dynamic URL targeting is also coming soon.</small>
        </Dialog.Description>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex direction='column' gap='3' className='my-4'>
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                Target
              </Text>
              <Select.Root onValueChange={(e) => setStage(e)}>
                <Select.Trigger placeholder='Select Target...' className='w-full' />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Stage</Select.Label>
                    {enums?.stage?.map((target: string, index: number) => (
                      <Select.Item key={index} value={index.toString()}>
                        {target}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                Target Name
              </Text>
              <TextField.Root id='name' placeholder='Write the Name' />
            </label>
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                Target URL
              </Text>
              <TextField.Root id='target' placeholder='Write the URL' />
            </label>
          </Flex>
          <Flex gap='3' mt='4' justify='end'>
            <Dialog.Close>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </Dialog.Close>
            <Button type='submit'>Save</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { CreateTarget };
