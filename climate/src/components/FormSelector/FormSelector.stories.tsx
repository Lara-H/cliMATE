/* eslint-disable */
import FormSelector from './FormSelector';

export default {
  title: "FormSelector",
};

export const Default = () => <FormSelector handleClick={function (modeName: string): void {
  throw new Error('Function not implemented.');
} } currentMode={''} />;

Default.story = {
  name: 'default',
};
