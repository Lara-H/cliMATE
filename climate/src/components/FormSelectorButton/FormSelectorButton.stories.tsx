/* eslint-disable */
import FormSelectorButton from './FormSelectorButton';
import {faCoffee} from '@fortawesome/free-solid-svg-icons'


export default {
  title: "FormSelectorButton",
};

export const Default = () => <FormSelectorButton icon={faCoffee} title="" modeName={''} handleClick={function (id: string): void {
  throw new Error('Function not implemented.');
} } />;

Default.story = {
  name: 'default',
};
