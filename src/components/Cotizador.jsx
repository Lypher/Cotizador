import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Cotizador.css';

function Cotizador() {
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState(20);
  const [precioEstimado, setPrecioEstimado] = useState(0);
  const [opcionesPropiedad, setOpcionesPropiedad] = useState([]);
  const [opcionesUbicacion, setOpcionesUbicacion] = useState([]);
  const [mostrarBotonGuardar, setMostrarBotonGuardar] = useState(false);

  useEffect(() => {
cargarDatos();
  }, []);

  const cargarDatos = () => {
    fetch("./datos/datosPropiedad.json")
      .then(response => response.json())
      .then(data => setOpcionesPropiedad(data))
      .catch(error => console.error('Error al cargar datosPropiedad.json:', error));

    fetch("./datos/datosUbicacion.json")
      .then(response => response.json())
      .then(data => setOpcionesUbicacion(data))
      .catch(error => console.error('Error al cargar datosUbicacion.json:', error));
  };

  const cotizarPoliza = () => {
    const propiedadSeleccionada = opcionesPropiedad.find(opcion => opcion.tipo === tipoPropiedad);
    const ubicacionSeleccionada = opcionesUbicacion.find(opcion => opcion.tipo === ubicacion )
  

    if (propiedadSeleccionada && ubicacionSeleccionada) {
      const resultado = propiedadSeleccionada.factor *ubicacionSeleccionada.factor * metrosCuadrados * 100;
      setPrecioEstimado(resultado.toFixed(2));
      const cotizacion = {
        fechaCotizacion: new Date().toLocaleString(),
        propiedad:       propiedadSeleccionada,
        ubicacion:       ubicacionSeleccionada,
        metrosCuadrados: metrosCuadrados,
        poliza:          resultado,
       }
       alert("cotizacion realizada con exito")
       setMostrarBotonGuardar(true);
       return cotizacion
      

    } else {
      alert('Faltan datos,por favor complete el formulario');
    }
  }


  const guardarEnHistorial= (prop) =>{
    const historial = JSON.parse(localStorage.getItem("historial")) || []
    historial.push(prop)
    localStorage.setItem("historial",JSON.stringify(historial))
  }


  return (
    <div>
       <NavLink to="/historial">📋</NavLink>
      <h2>Completa los datos solicitados</h2>
      <h4>Selecciona el tipo de propiedad</h4>
      <select
        id="propiedad"
        value={tipoPropiedad}
        onChange={(e) => setTipoPropiedad(e.target.value)}
      >
        <option value="" disabled>
          ...
        </option>
        {opcionesPropiedad.map((opcion, index) => (
          <option key={index} value={opcion.tipo}>
            {opcion.tipo}
          </option>
        ))}
      </select>

      <h4>Selecciona su ubicación</h4>
      <select
        id="ubicacion"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
      >
        <option value="" disabled>
          ...
        </option>
        {opcionesUbicacion.map((opcion, index) => (
          <option key={index} value={opcion.tipo}>
            {opcion.tipo}
          </option>
        ))}
      </select>

      <h4>Ingresa los metros cuadrados</h4>
      <input
        type="number"
        value={metrosCuadrados}
        onChange={(e) => setMetrosCuadrados(e.target.value)}
      />

      <button onClick={cotizarPoliza}>Cotizar</button>

      <h3> Precio estimado: ${precioEstimado}</h3>
      <div>
      {mostrarBotonGuardar && (
        <button onClick={() => guardarEnHistorial(cotizarPoliza())}>Guardar en Historial</button>
      )}
    </div>
    </div>
  );
}

export default Cotizador;
