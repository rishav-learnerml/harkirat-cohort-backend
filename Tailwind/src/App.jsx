import "./App.css";

function App() {
  return (
    <>
      {/* 
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ background: "red" }}>Hi</div>
        <div style={{ background: "green" }}>Hi</div>
        <div style={{ background: "yellow" }}>Hi</div>
      </div>
      */}
      {/* 
      <div className="flex justify-between">
        <div className="bg-red-300">Hi</div>
        <div className="bg-blue-300">Hi</div>
        <div className="bg-green-300">Hi</div>
      </div> 
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
        <div className="bg-red-300 col-span-1">Hi</div>
        <div className="bg-blue-300 col-span-1">Hi</div>
        <div className="bg-green-300 col-span-1">Hi</div>
      </div>
    </>
  );
}

export default App;
