import { useEffect, useRef, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Movies from "./components/Movies";

function App() {
  const urlAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=";
  const apiKey = "b90b8526";
  
  const [backgroundPosition, setBackgroundPosition] = useState(0);

    const divRef = useRef();
    useEffect(() => {
      const handleScroll = () => {
        const div = divRef.current;
        const { y } = div.getBoundingClientRect();
        const position = y * 0.1 * -1;

        setBackgroundPosition(`${position}`);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [backgroundPosition]);


  return (
    <div
      style={{ backgroundPosition: `0 ${backgroundPosition}px` }}
      className="App"
    >
      <div ref={divRef}></div>

      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Movies urlAPI={urlAPI} apiKey={apiKey} />}
          />
        </Routes>
      </HashRouter>
      <footer
        className="d-flex justify-content-center align-items-center text-light fs-5"
        style={{
          width: "100%",
          height: "80px",
          background: "gray",
          position: "absolute",
          bottom: "0",
        }}
      >
        © Stiven Morales Developers 
      </footer>
    </div>
  );
}

export default App;
