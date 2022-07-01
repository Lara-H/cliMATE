/* eslint-disable */
import FormArea from './FormArea';

export default {
  title: "FormArea",
};

function setResult(){
  console.log("FormAreaStory");
}

export const Default = () => <FormArea result={[]} setResult={setResult} children=""/>;

Default.story = {
  name: 'default',
};
