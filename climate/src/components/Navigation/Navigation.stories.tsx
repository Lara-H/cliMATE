/* eslint-disable */
import Navigation from './Navigation';

export default {
  title: "Navigation",
};

export const Default = () => <Navigation handleClick={function (modeName: string): void {
  throw new Error('Function not implemented.');
} } />;

Default.story = {
  name: 'default',
};
