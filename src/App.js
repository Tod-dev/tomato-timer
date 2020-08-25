import React, { useState, useMemo, useEffect } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";

import Header from "./page/Header/Header";
import Main from "./page/Main/Main";
import Footer from "./page/Footer/Footer";
import MyContext from "./MyContext";
import ENV from "./env";

// const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
//   const [value, setValue] = useState(
//     localStorage.getItem(localStorageKey) || defaultValue
//   );
//   useEffect(() => {
//     localStorage.setItem(localStorageKey, JSON.stringify(value)); // solo perchè è un oggetto
//   }, [value, localStorageKey]);
//   return [value, setValue];
// };

const App = () => {
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || ENV.settings
  );

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings)); // solo perchè è un oggetto
  }, [settings]);

  const providerValue = useMemo(() => ({ settings, setSettings }), [
    settings,
    setSettings,
  ]);

  const handleKeys = (key) => {
    switch (key) {
      case "alt+p": //!Pomodoro
        if (settings.actual !== "pomodoro")
          setSettings({ ...settings, actual: "pomodoro" });
        break;
      case "alt+s": //!Short Break
        if (settings.actual !== "shortBreak")
          setSettings({ ...settings, actual: "shortBreak" });
        break;
      case "alt+l": //!Long Break
        if (settings.actual !== "longBreak")
          setSettings({ ...settings, actual: "longBreak" });
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
