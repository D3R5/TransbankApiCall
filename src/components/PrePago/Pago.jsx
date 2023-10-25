import React from "react";
import { Link } from "react-router-dom";

function Pago() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary text-white">
      <div className="text-center">
        <h1 className="display-4 mb-3">Prueba API transbank</h1>
        <Link
          className="btn btn-lg btn-danger mb-3"
          to="https://www.transbankdevelopers.cl/referencia/webpay?l=http#webpay-plus_1"
          title="API WEBPAY"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentación API Transbank
        </Link>
        <br />
        <Link className="btn btn-lg btn-warning mb-3" to="/trb" title="Pago">
          Simular pago
        </Link>
      </div>
    </div>
  );
}

export default Pago;
