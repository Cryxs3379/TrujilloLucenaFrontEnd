import React, { useState } from "react";

const MisWebs = () => {
  const wordpressSites = [
    "https://www.mvhairstudio.es",
    "https://www.alnekoabogados.es",
    "https://www.sinlag.es",
    "https://www.clubderugbyvictoriano.es",
    "https://www.vabalounge.com",
    "https://www.designyourstyle.es/"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSite = wordpressSites[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? wordpressSites.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === wordpressSites.length - 1 ? 0 : prev + 1));
  };

  const openSite = () => {
    window.open(currentSite, "_blank");
  };

  return (
    <div className="container mt-4 text-center">
      <h1>Mis Sitios WordPress</h1>

      {/* IFRAME */}
      <div
        style={{
          maxWidth: "100%",
          minWidth: "300px",
          width: "90vw",
          height: "60vh",
          margin: "2rem auto",
          border: "2px solid #ccc",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <iframe
          src={currentSite}
          title={`Web: ${currentSite}`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>

      {/* BOTONES */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        <button
          onClick={goToPrevious}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            minWidth: "150px"
          }}
        >
          ⬅ Página anterior
        </button>

        <button
          onClick={openSite}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            minWidth: "150px"
          }}
        >
          🌐 Visitar sitio
        </button>

        <button
          onClick={goToNext}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            minWidth: "150px"
          }}
        >
          Siguiente página ➡
        </button>
      </div>

      <p className="mb-4"><strong>{currentSite}</strong></p>
    </div>
  );
};

export default MisWebs;
