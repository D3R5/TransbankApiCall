import React, { useState } from "react";
import { Link } from "react-router-dom";

const Init = () => {
  const [token, setToken] = useState(null);
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTransaction = async () => {
    setIsLoading(true);
    try {
      const data = {
        buy_order: "ordenCompra12345678",
        session_id: "sesion1234557545",
        amount: 25000,
        return_url: "http://localhost:5173/postpago",
      };

      localStorage.setItem("buy_order", data.buy_order);
      localStorage.setItem("amount", JSON.stringify(25000));

      const response = await fetch("http://localhost:3000/crear-transaccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Token:", result.token);
      console.log("URL:", result.url);

      //! Actualizo el estado con el token y la URL después de un retraso de 3 segundo
      setTimeout(() => {
        setToken(result.token);
        setUrl(result.url);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  //! Redirige cuando tengo un token y una URL válida
  if (token && url) {
    window.location.href = `${url}?token_ws=${token}`;
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning" role="alert">
          Redirigiendo a la página de pago...
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary">
      <Link className="btn btn-lg btn-light mb-3" to="/" title="Inicio">
        Volver atrás
      </Link>
      <Link
        className="btn btn-lg btn-danger mb-3"
        to="https://www.transbankdevelopers.cl/documentacion/como_empezar#tarjetas-de-prueba"
        title="Tarjetas"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tarjetas de pruebas oficiales
      </Link>
      <button
        className={`btn btn-lg ${isLoading ? "btn-secondary" : "btn-warning"}`}
        onClick={handleCreateTransaction}
        disabled={isLoading}
      >
        {isLoading ? "Creando Transacción..." : "Crear Transacción"}
      </button>

      {isLoading && (
        <p className="mt-3 alert alert-danger">Por favor, espere...</p>
      )}
    </div>
  );
};

export default Init;
