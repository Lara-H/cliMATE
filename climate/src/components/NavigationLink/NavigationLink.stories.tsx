/* eslint-disable */
import NavigationLink from './NavigationLink';

export default {
  title: "NavigationLink",
};

export const Default = () => <NavigationLink currentMode={''} modeName={''} handleClick={function (modeName: string): void {
  throw new Error('Function not implemented.');
} } title={''} />;

Default.story = {
  name: 'default',
};
