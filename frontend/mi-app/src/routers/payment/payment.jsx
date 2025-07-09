import { useContext } from 'react';
import PaymentForm from '../../componets/payment-form/payment-form';
import MercadoPagoCard from '../../componets/mercado_pago_card/mercado_pago_card';
import ButtonBack from '../../componets/button_back/button_back';

import { MethodStatePaymentContext } from '../../context/method_state_payment/method_state_payment.context';
import './payment.scss';

const Payment = () => {
  const { methodStatePayment } = useContext(MethodStatePaymentContext);

  const selectedMethod = methodStatePayment?.method.methodId || 'mercadopago'; // fallback por si no hay nada 

  return (
    <div className='payment__container'>
      <div className="payment__content">
        {selectedMethod === 'mercadopago' ? <MercadoPagoCard /> : <PaymentForm />}
      </div>
      <ButtonBack />
    </div>
  );
};

export default Payment;
