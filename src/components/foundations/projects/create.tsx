import { Button, Dialog, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { Method, sendRequest } from '../../../clients/api';
import { getCurrentTeam } from '../../../state/selectors/teams';
import { useSelector } from 'react-redux';

/**
 * CreateProject component renders a dialog for creating a new project.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.callback - A callback function to be executed after the project is created.
 *
 * @returns {JSX.Element} The rendered CreateProject component.
 *
 * @remarks
 * This component uses a dialog to collect the project name from the user and submit it via a POST request.
 * The dialog can be opened and closed, and the form submission is handled with a callback function.
 *
 * @example
 * ```tsx
 * <CreateProject callback={() => console.log('Project created!')} />
 * ```
 */
const CreateProject = ({ callback }: { callback: () => void }): JSX.Element => {
  /**
   * Represents the open state of the dialog.
   */
  const [open, setOpen] = useState(false);

  /**
   * Represents the current team.
   */
  const currentTeam = useSelector(getCurrentTeam)!;

  /**
   * Handles the form submission.
   */
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        name: { value: string };
      };

      sendRequest(Method.POST, `projects`, { name: formElements.name.value, teamId: currentTeam.id }).then(() => {
        if (callback) {
          callback();
        }
      });
    },
    [callback, currentTeam.id]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Create Project</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth='450px'>
        <Heading as='h2'>Create Project</Heading>
        <Dialog.Description size='2' mb='4' mt='2'>
          Projects contain schedules, and can have specific members assigned to them.
        </Dialog.Description>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex direction='column' gap='3' className='my-4'>
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                Project Name
              </Text>
              <TextField.Root id='name' placeholder='Write the Project Name' />
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

export { CreateProject };