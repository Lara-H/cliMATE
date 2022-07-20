import React, { FC, useState } from "react";
import styles from "./QuoteArea.module.scss";
import woman from "./woman.png";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import man from "./man.png";
import { Button } from "react-bootstrap";

interface QuoteAreaProps {}

const QuoteArea: FC<QuoteAreaProps> = () => {
  const [state, setState] = useState(false);

  return (
    <div className={`${styles.QuoteArea}`} data-testid="QuoteArea">
      <CSSTransition<undefined>
        key={state ? "Goodbye, world!" : "Hello, world!"}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames="fade"
      >
        <div className="bg-dark">
          <div className="container pt-4">
            <div className="row">
              <div className="col-12 col-lg-5 col-xl-6">
                <blockquote className={`blockquote mb-4 ${styles["cm-blockquote"]}`}>
                  <p className="mb-4 lead text-light">
                    {state
                      ? '"Umweltschutz wird immer wichtiger und wir müssen endlich anfangen etwas zu verändern"'
                      : '"Wir haben unseren nachfolgenden Generationen gegenüber eine gewisse Verantwortung"'}
                  </p>
                  <footer className="blockquote-footer">
                    <span className="small">
                      {state
                        ? "Katharina Möhre (Schauspielerin)"
                        : "Magnus Grünkohl (Sänger)"}
                    </span>
                  </footer>
                </blockquote>
                <button
                  className="btn btn-small btn-primary text-light"
                  onClick={() => setState((state) => !state)}
                >
                  {state ? "Zu Magnus" : "Zu Katharina"}
                </button>
              </div>
              <div className="col-12 col-lg">
                <div className="row align-items-baseline">
                  <div className="col">
                    <img
                      onClick={() => setState(true)}
                      src={woman}
                      className={`${
                        state
                          ? `img-fluid ${styles["cm-img-in"]}`
                          : `img-fluid ${styles["cm-img-out"]}`
                      }`}
                    ></img>
                  </div>
                  <div className="col">
                    <img
                      onClick={() => setState(false)}
                      src={man}
                      className={`${
                        state
                          ? `img-fluid ${styles["cm-img-out"]}`
                          : `img-fluid ${styles["cm-img-in"]}`
                      }`}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default QuoteArea;
