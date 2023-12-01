import './App.css';
import Cotizador from './components/Cotizador';
import Historial from './components/Historial';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
     <Routes>
     <Route path="/" element={<Cotizador />} />
     <Route path="/historial" element={<Historial />} />
     </Routes>
  );
}

export default App;
