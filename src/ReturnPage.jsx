import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Asumiendo que estás usando react-router-dom para manejar las rutas

const ReturnPage = () => {
  const { token } = useParams(); // Obtenemos el token de la URL usando react-router-dom
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
          headers: {
            'Tbk-Api-Key-Id': '597055555532',
            'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTransactionData(data);
        } else {
          // Manejar errores de solicitud
          console.error('Error al obtener el estado de la transacción');
        }
      } catch (error) {
        // Manejar errores de red u otros errores
        console.error('Error:', error);
      }
    };

    if (token) {
      fetchTransactionStatus();
    }
  }, [token]);

  return (
    <div className="ReturnPage">
      {transactionData ? (
        <div className="transaction-details">
          <h2>Detalles de la Transacción</h2>
          <p>Estado: {transactionData.status}</p>
          <p>Monto: {transactionData.amount}</p>
          <p>Autorización: {transactionData.authorization_code}</p>
          {/* Mostrar otros detalles de la transacción según sea necesario */}
        </div>
      ) : (
        <p>Cargando detalles de la transacción...</p>
      )}
    </div>
  );
};

export default ReturnPage;
