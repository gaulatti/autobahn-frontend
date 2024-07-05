import { Card, CardHeader, Body1, Caption1, CardPreview, CardFooter, Button, Title2, Label, Input } from '@fluentui/react-components';
import { AddFilled } from '@fluentui/react-icons';
const Trigger = () => {
  return (
    <Card className='w-full my-4'>
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
          <Label htmlFor='trigger-url' className='flex' size='small'>
            Website URL
          </Label>
          <Input id='trigger-url' size="large" className='w-full' />
        </Body1>
      </CardPreview>

      <CardFooter>
        <Button icon={<AddFilled fontSize={16} />}>Trigger</Button>
      </CardFooter>
    </Card>
  );
};

export { Trigger };
