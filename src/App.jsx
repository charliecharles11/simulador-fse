import { useState } from "react";

function SimuladorPreferenciasFSE() {
  const [aspirantes, setAspirantes] = useState([]);
  const [plazasDisponibles, setPlazasDisponibles] = useState({});
  const [resultadoGlobal, setResultadoGlobal] = useState([]);

  const clavePlaza = (pref) =>
    `${pref.especialidad} - ${pref.centro} - ${pref.ciudad}`;

  const actualizarPlazas = (clave, valor) => {
    setPlazasDisponibles({
      ...plazasDisponibles,
      [clave]: Number(valor),
    });
  };

  const cargarCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const filas = text.split("\n").slice(1);

      const nuevosAspirantes = filas
        .filter((f) => f.trim() !== "")
        .map((fila) => {
          const [nombre, numeroOrden, especialidad, centro, ciudad] =
            fila.split(",");

          return {
            nombre,
            numeroOrden: Number(numeroOrden),
            preferencias: [
              {
                especialidad,
                centro,
                ciudad,
              },
            ],
          };
        });

      setAspirantes(nuevosAspirantes);
    };

    reader.readAsText(file);
  };

  const simularAdjudicacionMasiva = () => {
    const copiaPlazas = { ...plazasDisponibles };
    const ordenados = [...aspirantes].sort(
      (a, b) => a.numeroOrden - b.numeroOrden
    );

    const resultados = ordenados.map((asp) => {
      let adjudicada = null;

      for (let pref of asp.preferencias) {
        const clave = clavePlaza(pref);
        if (copiaPlazas[clave] > 0) {
          adjudicada = clave;
          copiaPlazas[clave] -= 1;
          break;
        }
      }

      return {
        ...asp,
        adjudicada,
      };
    });

    setResultadoGlobal(resultados);
    setPlazasDisponibles(copiaPlazas);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Simulador Oficial de Adjudicación FSE 2026</h1>

      <h2>1. Cargar aspirantes (CSV)</h2>
      <p>Formato: nombre,numeroOrden,especialidad,centro,ciudad</p>
      <input type="file" accept=".csv" onChange={cargarCSV} />

      <h2 style={{ marginTop: "30px" }}>2. Definir plazas disponibles</h2>

      {aspirantes.map((asp, index) => {
        const pref = asp.preferencias[0];
        const clave = clavePlaza(pref);

        return (
          <div key={index} style={{ marginBottom: "10px" }}>
            <span>{clave}</span>{" "}
            <input
              type="number"
              min="0"
              value={plazasDisponibles[clave] || 0}
              onChange={(e) =>
                actualizarPlazas(clave, e.target.value)
              }
            />
          </div>
        );
      })}

      <div style={{ marginTop: "20px" }}>
        <button onClick={simularAdjudicacionMasiva}>
          Ejecutar adjudicación masiva
        </button>
      </div>

      {resultadoGlobal.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>Resultados</h2>
          {resultadoGlobal.map((res, index) => (
            <div key={index}>
              {res.numeroOrden} - {res.nombre} →{" "}
              {res.adjudicada || "Sin plaza"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SimuladorPreferenciasFSE;