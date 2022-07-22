import React, { FC, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Routes war früher Switch
import Navigation from "../Navigation/Navigation";
import Teaser from "../Teaser/Teaser";
import FormSelector from "../FormSelector/FormSelector";
import ResultArea from "../ResultArea/ResultArea";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";
import Imprint from "../Imprint/Imprint";
import Privacy from "../Privacy/Privacy";
import TravelForm from "../TravelForm/TravelForm";
import FreightForm from "../FreightForm/FreightForm";
import HouseholdForm from "../HouseholdForm/HouseholdForm";
import QuoteArea from "../QuoteArea/QuoteArea";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useTranslation } from "react-i18next";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  const { t } = useTranslation();
  const localDataMode = localStorage.getItem("mode");
  const [result, setResult] = useState([]);
  const [currentMode, setCurrentMode] = useState(
    localDataMode ? JSON.parse(localDataMode) : "travel"
  );
  const [formComponent, setFormComponent] = useState(
    <TravelForm result={[]} setResult={setResult}></TravelForm>
  );

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(currentMode));
  });

  /**
   * handle mode change
   * @param modeName 
   */
  function handleModeChange(modeName: string) {
    setCurrentMode(modeName);
    switch (modeName) {
      case "travel":
        setFormComponent(
          <TravelForm result={result} setResult={setResult}></TravelForm>
        );
        break;
      case "freight":
        setFormComponent(
          <FreightForm result={result} setResult={setResult}></FreightForm>
        );
        break;
      case "household":
        setFormComponent(
          <HouseholdForm result={result} setResult={setResult}></HouseholdForm>
        );
        break;
      default:
        setFormComponent(
          <TravelForm result={result} setResult={setResult}></TravelForm>
        );
        break;
    }
  }

  return (
    <Router>
      <Suspense fallback={<div>{t("routing-loading")}</div>}>
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
                    <Teaser
                      currentMode={currentMode}
                      handleClick={handleModeChange}
                    />{" "}
                    <QuoteArea></QuoteArea>
                    <FormSelector
                      currentMode={currentMode}
                      handleClick={handleModeChange}
                    />{" "}
                    {formComponent}
                    <ResultArea result={result} />{" "}
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
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer></Footer>
        </div>
      </Suspense>
    </Router>
  );
};

export default Layout;