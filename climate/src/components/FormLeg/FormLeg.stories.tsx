/* eslint-disable */
import FormLeg from './FormLeg';

export default {
  title: "FormLeg",
};

const newLeg={
  id: 1,
  type: "Test",
  distance: 50
}

export const Default = () => <FormLeg leg={newLeg}></FormLeg>;

Default.story = {
  name: 'default',
};
