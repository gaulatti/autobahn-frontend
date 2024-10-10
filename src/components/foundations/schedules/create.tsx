import { Button, Dialog, Flex, Heading, Select, Text, TextField } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { Method, sendRequest } from '../../../clients/api';

/**
 * CreateSchedule component allows users to create a new schedule for a given project.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.projectUUID - The unique identifier of the project.
 * @param {Object} props.targets - The targets object containing rows of target data.
 * @param {Array} props.targets.rows - An array of target objects.
 * @param {number} props.targets.rows[].id - The unique identifier of the target.
 * @param {string} props.targets.rows[].name - The name of the target.
 * @param {Function} props.callback - The callback function to be called after the schedule is created.
 *
 * @returns {JSX.Element} The rendered CreateSchedule component.
 */
const CreateSchedule = ({
  projectUUID,
  targets,
  callback,
}: {
  projectUUID: string;
  callback: () => void;
  targets: { rows: { id: number; name: string }[] };
}) => {
  /**
   * Represents the open state of the dialog.
   */
  const [open, setOpen] = useState(false);

  /**
   * Represents the selected target.
   */
  const [target, setTarget] = useState<string | null>(null);

  /**
   * Handles the form submission.
   */
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        cron: { value: string };
      };

      sendRequest(Method.POST, `projects/${projectUUID}/schedules`, { targetId: target, cron: formElements.cron.value }).then(() => {
        if (callback) {
          callback();
        }
      });
    },
    [callback, projectUUID, target]
  );

  return (
    targets && (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button>Create Schedule</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth='450px'>
          <Heading as='h2'>Create Schedule</Heading>
          <Dialog.Description size='2' mb='4' mt='2'>
            Any new schedule will be immediatelly set for execution as per the Cron Expression.
          </Dialog.Description>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Flex direction='column' gap='3' className='my-4'>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Target
                </Text>
                <Select.Root onValueChange={(e) => setTarget(e)}>
                  <Select.Trigger placeholder='Select Target...' className='w-full' />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Target</Select.Label>
                      {targets?.rows.map((target: { id: number; name: string }) => (
                        <Select.Item key={target.id} value={target.id.toString()}>
                          {target.name}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Cron Expression
                </Text>
                <TextField.Root id='cron' placeholder='Write the Cron Expression' />
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
    )
  );
};

export { CreateSchedule };