/* eslint-disable */
import FormLeg from './FormLeg';

export default {
  title: "FormLeg",
};

const newLeg={
  id: "1",
  type: "Test",
  distance: 50,
  handleRemove: handleRemoveItem
}

export const Default = () => <FormLeg leg={newLeg} handleRemove={handleRemoveItem}></FormLeg>;

Default.story = {
  name: 'default',
};

function handleRemoveItem(id:string) {
  console.log(id);
}