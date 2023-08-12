import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => setTime(time + 1), 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time]);

  const stopWatchTimer = (time) => {
    const hour = Math.floor(time / 360000);
    const min = Math.floor((time % 360000) / 6000);
    const sec = Math.floor((time % 6000) / 100);
    const miliSec = Math.floor(time % 100);

    return hour + " : " + min + " : " + sec + " : " + miliSec;
  };

  const handleStartOrStop = () => {
    setIsRunning(!isRunning);
    setDisabled(false);
  };

  const handleToReset = () => {
    setTime(0);
  };

  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.main__con}>
          <div className={Styles.main__con__content}>
            <div className={Styles.main__con__content__timer}>
              <h2>{stopWatchTimer(time)}</h2>
            </div>

            <div className={Styles.main__con__content__btn}>
              {isRunning ? (
                <button onClick={handleStartOrStop} type="button" className="btn btn-danger mx-3">
                  Stop
                </button>
              ) : (
                <button onClick={handleStartOrStop} type="button" className="btn btn-success mx-3">
                  Start
                </button>
              )}

              <button disabled={disabled} onClick={handleToReset} type="button" className="btn btn-warning mx-3">
                reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
