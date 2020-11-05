import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      history.pop();
    } 
    setHistory([...history, newMode]); 
  }

  const back = () => {
    if (history.length < 2 ) {
      // console.log("history too short")
      return ;
    }
    // console.log("History before BACK: ", history);
    history.pop();
    setMode(history[history.length -1]);
    setHistory([...history])
    // console.log("History after BACK: ", history);
    }
  return { mode: mode, transition, back };
}

export default useVisualMode;