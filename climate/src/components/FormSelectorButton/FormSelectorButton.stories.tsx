/* eslint-disable */
import FormSelectorButton from './FormSelectorButton';
import {faCoffee} from '@fortawesome/free-solid-svg-icons'


export default {
  title: "FormSelectorButton",
};

export const Default = () => <FormSelectorButton icon={faCoffee} title="" />;

Default.story = {
  name: 'default',
};
