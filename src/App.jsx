import { useState, useEffect } from "react";
import Bienvenida from "./components/Bienvenida";
import "../src/styles/style.css";

const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="spinner"></div>
      <p>Cargando...</p>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Bienvenida />
      )}
    </div>
  );
}

export default App;
