import { createContext, useState } from "react";

//context state
const CounterContext = createContext({
  count: 0,
  increment: () => {},
  decrement: () => {},
});

//context wrapper
const CounterContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const decrement = () => {
    setCount((c) => c - 1);
  };

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

export {CounterContext,CounterContextProvider};
