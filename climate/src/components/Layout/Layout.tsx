import React, { FC, lazy, Suspense, useState, useEffect, useReducer } from "react";
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
import HouseholdForm from "../HouseholdForm/HouseholdForm";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  const localDataMode = localStorage.getItem('mode');
  const [currentMode, setCurrentMode] = useState(localDataMode ? JSON.parse(localDataMode) : "travel");
  const [formComponent, setFormComponent] = useState(<TravelForm></TravelForm>);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(currentMode))
  })

  function handleModeChange(modeName: string) {
    setCurrentMode(modeName);
    switch (modeName) {
      case "travel":
        setFormComponent(<TravelForm></TravelForm>);
        break;
      case "freight":
        setFormComponent(<FreightForm></FreightForm>);
        break;
      case "household":
        setFormComponent(<HouseholdForm></HouseholdForm>);
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
          <Navigation
            handleClick={handleModeChange}
            currentMode={currentMode}
          ></Navigation>
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {" "}
                    <Teaser />{" "}
                    <FormSelector
                      currentMode={currentMode}
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
