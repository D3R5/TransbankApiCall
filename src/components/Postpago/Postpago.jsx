import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const vciMessages = {
  TSY: 'Transacción Exitosa',
  TSN: 'Transacción Rechazada',
  NP: 'No participa, sin autenticación',
  U3: 'Falla conexión, Autenticación Rechazada',
  INV: 'Datos Inválidos',
  CNP1: 'Comercio no participa',
  EOP: 'Error operacional',
  BNA: 'BIN no adherido',
  ENA: 'Emisor no adherido',
};

const responseCodeMessages = {
  "0": "Transacción aprobada",
  "-1": "Rechazo - Posible error en el ingreso de datos de la transacción",
  "-2": "Rechazo - Se produjo fallo al procesar la transacción, este mensaje de rechazo se encuentra relacionado a parámetros de la tarjeta y/o su cuenta asociada",
  "-3": "Rechazo - Error en Transacción",
  "-4": "Rechazo - Rechazada por parte del emisor",
  "-5": "Rechazo - Transacción con riesgo de posible fraude"
};

const paymentTypeCodeMessages = {
  VD: 'Venta débito',
  VN: 'Venta normal',
  VC: 'Venta en cuotas',
  SI: '3 cuotas sin interés',
  S2: '2 cuotas sin interés',
  NC: 'N cuotas sin interés',
  VP: 'Venta prepago',
}


function Postpago() {
  const [buyOrder, setBuyOrder] = useState(null);
  const [amount, setAmount] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  useEffect(() => {
    const storedBuyOrder = localStorage.getItem("buy_order");
    const storedAmount = localStorage.getItem("amount");

    if (storedBuyOrder && storedAmount) {
      setBuyOrder(storedBuyOrder);
      setAmount(JSON.parse(storedAmount));

      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token_ws");

      // Hago la solicitud al servidor intermedio para obtener el estado de la transacción
      fetch(`http://localhost:3000/obtener-estado-transaccion/${token}`)
        .then((response) => response.json())
        .then((data) => {
          setTransactionStatus(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-150 bg-primary">
      <h2 className="display-4 mb-4 text-white">Estado de la Transacción</h2>
      <div className="card p-4 shadow">
        <p className="lead">Buy Order: {buyOrder}</p>
        <p className="lead">Amount: {amount}</p>
        {transactionStatus && (
          <div>
            <h2 className="text-warning mb-4">Detalles de la Transacción:</h2>
            <p>VCI: {transactionStatus.vci}</p>
            <h2 className="text-primary">{vciMessages[transactionStatus.vci]}</h2>
            <p>Monto: {transactionStatus.amount}</p>
            <p>Estado: {transactionStatus.status}</p>
            <p>Orden de Compra: {transactionStatus.buy_order}</p>
            <p>Session ID: {transactionStatus.session_id}</p>
            <p>Número de Tarjeta: {transactionStatus.card_detail.card_number}</p>
            <p>Fecha de Transacción: {transactionStatus.transaction_date}</p>
            <p>Código de Autorización: {transactionStatus.authorization_code}</p>
            <p>Código de Respuesta: {transactionStatus.response_code}</p>
            <h3>{responseCodeMessages[transactionStatus.response_code]}</h3> 
            <p>Tipo de Pago: {transactionStatus.payment_type_code}</p>
            <h3>{paymentTypeCodeMessages[transactionStatus.payment_type_code]}</h3> 
            <p>Número de Cuotas: {transactionStatus.installments_number}</p>
          </div>
        )}
        <Link to="/" className="btn btn-danger" title="Inicio">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default Postpago;
