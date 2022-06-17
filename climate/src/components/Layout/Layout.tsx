import React, { FC, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Routes war früher Switch
import Navigation from "../Navigation/Navigation";
import Teaser from "../Teaser/Teaser";
import FormSelector from "../FormSelector/FormSelector";
import FormArea from "../FormArea/FormArea";
import ResultArea from "../ResultArea/ResultArea";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";
import Imprint from "../Imprint/Imprint";
import Privacy from "../Privacy/Privacy";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <div className={styles.Layout} data-testid="Layout">
      <Navigation></Navigation>
      <div className="content">
        <Routes>
          <Route path="/" element={<> <Teaser/> <FormSelector/> <FormArea/> <ResultArea/> </>} />
          <Route path="/impressum" element={<> <Imprint/> </>} />
          <Route path="/datenschutz" element={<> <Privacy/> </>} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
    </Suspense>
  </Router>
);

export default Layout;
