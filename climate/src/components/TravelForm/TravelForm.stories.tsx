/* eslint-disable */
import TravelForm from './TravelForm';

export default {
  title: "TravelForm",
};

function setResult(){
  console.log("TravelFormStory");
}

export const Default = () => <TravelForm result={[]} setResult={setResult}/>;

Default.story = {
  name: 'default',
};
