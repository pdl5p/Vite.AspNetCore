import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

function callApi() {
    console.log("Calling API");
    return fetch("/api/one").then(result => {

        console.log(`RESULT: ${result.ok}`);

        return result.text();
    }).then(text => {
        console.log(`TEXT: ${text}`);
        return text;
    });
}

function App() {

    const [val,setVal] = useState("");

    const onclick = async () => {
        var t = await callApi();
        setVal(t);
    }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
          </div>  
      <h1>APP TWO</h1>
          <div className="card">
              <button onClick={onclick}>
                  Call API {val}
        </button>
       
      </div>
      <p className="read-the-docs">
        Click on the Vite, ASP.NET and React logos to learn more
      </p>
    </>
  );
}

export default App;
