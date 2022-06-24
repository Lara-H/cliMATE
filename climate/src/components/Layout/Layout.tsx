import React, { FC, useEffect, useState } from "react";
import Footer from '../Footer/Footer';
import FormArea from '../FormArea/FormArea';
import FormSelector from '../FormSelector/FormSelector';
import Navigation from '../Navigation/Navigation';
import ResultArea from '../ResultArea/ResultArea';
import Teaser from '../Teaser/Teaser';
import styles from './Layout.module.scss';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  const [result, setResult] = useState([]);

  return (
  <div className={styles.Layout} data-testid="Layout">
    <Navigation></Navigation>
    <Teaser></Teaser>
    <FormSelector></FormSelector>
    <FormArea></FormArea>
    <ResultArea></ResultArea>
    <Footer></Footer>
  </div>
);
};

export default Layout;
