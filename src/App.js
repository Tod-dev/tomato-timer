import React, { useState, useMemo } from "react";

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
  return (
    <MyContext.Provider value={providerValue}>
      <Header />
      <Main />
      <Footer />
    </MyContext.Provider>
  );
};

export default App;
