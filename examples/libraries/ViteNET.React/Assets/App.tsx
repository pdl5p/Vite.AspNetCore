import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import dotnetLogo from "./assets/dotnet.svg";
import typescriptLogo from "./assets/typescript.svg";
import f1, { f2 } from './funcy';
import SigIT from './SigIT';

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

    useEffect(() => {
        f1();
        console.log(f2());
        //f3.run();
    }, []);

  return (
      <>
          <div>
              <SigIT />
          </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://dotnet.microsoft.com/" target="_blank">
          <img src={dotnetLogo} className="logo" alt="Dotnet logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={typescriptLogo} className="logo" alt="TypeScript logo" />
        </a>
      </div>
      <h1>Vite + ASP.NET + React + Typescript</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, ASP.NET and React logos to learn more
      </p>
    </>
  );
}

export default App;