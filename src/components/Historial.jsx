// Historial.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/historial.css';

function Historial() {
  const [historial, setHistorial] = useState('');
  const traigodata = localStorage.getItem('historial');
  const arrayDeObjetos =  JSON.parse(traigodata) || [];

  useEffect(() => {
    setHistorial(arrayDeObjetos);
  }, []);

  let borrarHistorial = () =>{
 localStorage.removeItem("historial")
 setHistorial([]);
  }

  return (
    <div className="container">
      {arrayDeObjetos.length > 0 ? (
        arrayDeObjetos.map((opcion, index) => (
          <div key={index} className="poliza">
            <div className="fecha">Fecha de cotización: {opcion.fechaCotizacion}</div>
            <div className="detalle">
              <h3>Propiedad: {opcion.propiedad.tipo}</h3>
              <h3>Ubicación: {opcion.ubicacion.tipo}</h3>
              <h3>Metros cuadrados: {opcion.metrosCuadrados}</h3>
              <h3>Póliza mensual: {opcion.poliza}</h3>
            </div>
          </div>
        ))
      ) : (
        <p>No hay historial disponible.</p>
      )}
      <NavLink to="/">Volver</NavLink>
      <button onClick={borrarHistorial}>Borrar historial</button>
    </div>
  );
}

export default Historial;   