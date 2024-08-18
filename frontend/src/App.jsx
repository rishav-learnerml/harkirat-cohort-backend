import { useContext } from "react";
import { CounterContext, CounterContextProvider } from "./CounterContext";

const App = () => {
  return (
    <div>
      <CounterContextProvider>
        <DecrementCounter />
        <ShowCount />
        <IncrementCounter />
      </CounterContextProvider>
    </div>
  );
};

const ShowCount = () => {
  const { count } = useContext(CounterContext);
  return <div>{count}</div>;
};

const IncrementCounter = () => {
  const { increment } = useContext(CounterContext);
  return <button onClick={increment}>+</button>;
};

const DecrementCounter = () => {
  const { decrement } = useContext(CounterContext);

  return <button onClick={decrement}>-</button>;
};

export default App;
