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

  const datosPropiedad = [
    { tipo: 'Casa', factor: 1.09 },
    { tipo: 'P.H.', factor: 1.05 },
    { tipo: 'Depto. Edificio', factor: 1.02 },
    { tipo: 'Barrio Privado', factor: 1.19 },
    { tipo: 'Oficina', factor: 2.39 },
    { tipo: 'Local Comercial', factor: 1.41 },
    { tipo: 'Depósito Logística', factor: 1.92 }
  ];

  const datosUbicacion = [
    { tipo: 'CABA', factor: 1.13 },
    { tipo: 'Tandil', factor: 1.04 },
    { tipo: 'Costa Atlántica', factor: 1.29 },
    { tipo: 'Patagonia', factor: 1.00 },
  ];

  useEffect(() => {
    // Establece las opciones de propiedad y ubicación directamente
    setOpcionesPropiedad(datosPropiedad);
    setOpcionesUbicacion(datosUbicacion);
  }, []);

  const cotizarPoliza = () => {
    // Encuentra el objeto en opcionesPropiedad que coincide con el tipo seleccionado
    const propiedadSeleccionada = opcionesPropiedad.find(opcion => opcion.tipo === tipoPropiedad);
    const ubicacionSeleccionada = opcionesUbicacion.find(opcion => opcion.tipo === ubicacion )


    if (propiedadSeleccionada && ubicacionSeleccionada) {
      // Realiza la cotización multiplicando el factor por los metros cuadrados
      const resultado = propiedadSeleccionada.factor *ubicacionSeleccionada.factor * metrosCuadrados * 100;
      setPrecioEstimado(resultado.toFixed(2));
      const cotizacion = {
        fechaCotizacion: new Date().toLocaleString(),
        propiedad:       propiedadSeleccionada,
        ubicacion:       ubicacionSeleccionada,
        metrosCuadrados: metrosCuadrados,
        poliza:          resultado,
       }
       const historial = JSON.parse(localStorage.getItem("historial")) || []
       historial.push(cotizacion)
       localStorage.setItem("historial",JSON.stringify(historial))
       console.log(historial)
       alert("cotizacion realizada con exito")

    } else {
      // Maneja el caso donde no se encuentra la propiedad seleccionada
      alert('Faltan datos,por favor complete el formulario');
    }
  };

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
    </div>
  );
}

export default Cotizador;
