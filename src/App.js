import React, { useState, useMemo } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";

import Header from "./page/Header/Header";
import Main from "./page/Main/Main";
import Footer from "./page/Footer/Footer";
import MyContext from "./MyContext";
import ENV from "./env";

const App = () => {
  const [settings, setSettings] = useState(ENV.settings);
  const [timer, setTimer] = useState(ENV.settings.pomodoro); // timer è quello attuale
  const providerValue = useMemo(
    () => ({ timer, setTimer, settings, setSettings }),
    [timer, setTimer, settings, setSettings]
  );

  const handleKeys = (key) => {
    switch (key) {
      case "alt+p": //!Pomodoro
        if (timer !== settings.pomodoro) setTimer(settings.pomodoro);
        break;
      case "alt+s": //!Short Break
        if (timer !== settings.shortBreak) setTimer(settings.shortBreak);
        break;
      case "alt+l": //!Long Break
        if (timer !== settings.longBreak) setTimer(settings.longBreak);
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
