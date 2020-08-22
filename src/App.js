import React, { useState, useMemo } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";

import Header from "./page/Header/Header";
import Main from "./page/Main/Main";
import Footer from "./page/Footer/Footer";
import MyContext from "./MyContext";

const timers = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 10,
};

const App = () => {
  const [timer, setTimer] = useState(timers.pomodoro);
  const providerValue = useMemo(() => ({ timer, setTimer, data: timers }), [
    timer,
    setTimer,
  ]);

  const handleKeys = (key) => {
    switch (key) {
      case "alt+p": //!Pomodoro
        if (timer !== timers.pomodoro) setTimer(timers.pomodoro);
        break;
      case "alt+s": //!Short Break
        if (timer !== timers.shortBreak) setTimer(timers.shortBreak);

        break;
      case "alt+l": //!Long Break
        if (timer !== timers.longBreak) setTimer(timers.longBreak);
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
