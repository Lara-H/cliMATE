import React, { FC, lazy, Suspense, useState } from "react";
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
import TravelForm from "../TravelForm/TravelForm";
import FreightForm from "../FreightForm/FreightForm";
import { Module } from "module";

interface LayoutProps {
}

const Layout: FC<LayoutProps> = () => {
  const [formComponent, setFormComponent] = useState(<TravelForm></TravelForm>); 

  function handleModeChange(modeName: string) {
    console.log(modeName);
    
    switch (modeName) {
      case "travel":
        setFormComponent(<TravelForm></TravelForm>);
        break;
      case "freight":
        setFormComponent(<FreightForm></FreightForm>);
        break;
      default:
        setFormComponent(<TravelForm></TravelForm>);
        break;
    }
    
  }

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.Layout} data-testid="Layout">
          <Navigation></Navigation>
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {" "}
                    <Teaser /> <FormSelector
                      handleClick={handleModeChange}
                    />{" "}
                    {formComponent}
                   <ResultArea />{" "}
                  </>
                }
              />
              <Route
                path="/impressum"
                element={
                  <>
                    {" "}
                    <Imprint />{" "}
                  </>
                }
              />
              <Route
                path="/datenschutz"
                element={
                  <>
                    {" "}
                    <Privacy />{" "}
                  </>
                }
              />
            </Routes>
          </div>
          <Footer></Footer>
        </div>
      </Suspense>
    </Router>
  );
};

export default Layout;
