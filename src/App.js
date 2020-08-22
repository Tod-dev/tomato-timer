import React, { useState, useMemo } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";

import Header from "./page/Header/Header";
import Main from "./page/Main/Main";
import Footer from "./page/Footer/Footer";
import MyContext from "./MyContext";
import ENV from "./env";

const App = () => {
  const [timer, setTimer] = useState(ENV.timers.pomodoro);
  const providerValue = useMemo(() => ({ timer, setTimer, data: ENV.timers }), [
    timer,
    setTimer,
  ]);

  const handleKeys = (key) => {
    switch (key) {
      case "alt+p": //!Pomodoro
        if (timer !== ENV.timers.pomodoro) setTimer(ENV.timers.pomodoro);
        break;
      case "alt+s": //!Short Break
        if (timer !== ENV.timers.shortBreak) setTimer(ENV.timers.shortBreak);
        break;
      case "alt+l": //!Long Break
        if (timer !== ENV.timers.longBreak) setTimer(ENV.timers.longBreak);
        break;
      default:
        break;
    }
  };

  return (
    <MyContext.Provider value={providerValue}>
      <KeyboardEventHandler
        handleKeys={["alt+p", "alt+s", "alt+l"]}
        onKeyEvent={(key) => handleKeys(key)}
      />

      <Header />
      <Main />
      <Footer />
    </MyContext.Provider>
  );
};

export default App;
