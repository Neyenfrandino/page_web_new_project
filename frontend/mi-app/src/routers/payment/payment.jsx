import PaymentMethodSelector from '../../componets/payment_method/payment_method_selector';

import './payment.scss';

const Payment = () => {
    return (
        <div className='payment__container'>
            <PaymentMethodSelector 
            />
        </div>
    );
};

export default Payment;