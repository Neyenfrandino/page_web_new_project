import React, { useState } from 'react';
import { SiMercadopago, SiVisa, SiMastercard } from 'react-icons/si';
import { FaCreditCard } from 'react-icons/fa';
import './payment_method_selector.scss';

const PaymentMethodSelector = ({ onMethodSelect, onClose }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const paymentMethods = [
        {
            id: 'mercadopago',
            name: 'Mercado Pago',
            icon: 'mercadopago',
            type: 'digital_wallet',
            gateway: 'mercadopago',
            description: 'Pago seguro y rápido'
        },
        {
            id: 'cards',
            name: 'Tarjetas de Crédito/Débito',
            icon: 'cards',
            type: 'credit_cards',
            gateway: 'cards',
            supportedCards: ['visa', 'mastercard', 'amex', 'diners'],
            description: 'Visa, Mastercard, Amex, Diners'
        }
    ];

    const renderIcon = (iconType, size = 24) => {
        switch (iconType) {
            case 'mercadopago':
                return <SiMercadopago size={size} color="#009ee3" />;
            case 'cards':
                return (
                    <div className="cards-group">
                        <SiVisa size={20} color="#1a1f71" />
                        <SiMastercard size={20} color="#eb001b" />
                        <FaCreditCard size={20} color="#666" />
                    </div>
                );
            default:
                return <FaCreditCard size={size} color="#666" />;
        }
    };

    const handleMethodSelect = (method) => {
        setSelectedMethod(method.id);
    };

    const handleConfirmPayment = () => {
        const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);
        
        if (selectedMethodData && onMethodSelect) {
            setIsProcessing(true);
            
            // Simular un pequeño delay para mejor UX
            setTimeout(() => {
                onMethodSelect({
                    methodId: selectedMethodData.id,
                    methodName: selectedMethodData.name,
                    type: selectedMethodData.type,
                    gateway: selectedMethodData.gateway,
                    supportedCards: selectedMethodData.supportedCards || null
                });
                setIsProcessing(false);
            }, 500);
        }
    };

    const handleCancel = () => {
        setSelectedMethod(null);
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className='payment-method-selector'>
            <div className='payment-method-selector__header'>
                <h2>Formas de Pago</h2>
                <p>Selecciona tu método de pago preferido</p>
            </div>
            
            <div className='payment-method-selector__options'>
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        className={`payment-method-selector__option ${
                            selectedMethod === method.id ? 'selected' : ''
                        }`}
                        onClick={() => handleMethodSelect(method)}
                        disabled={isProcessing}
                    >
                        <div className='payment-method-selector__option-icon'>
                            {renderIcon(method.icon)}
                        </div>
                        <div className='payment-method-selector__option-info'>
                            <span className='payment-method-selector__option-name'>
                                {method.name}
                            </span>
                            <span className='payment-method-selector__option-subtitle'>
                                {method.description}
                            </span>
                        </div>
                        <div className='payment-method-selector__option-check'>
                            {selectedMethod === method.id && (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M16.25 6.25L8.125 14.375L3.75 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {selectedMethod && (
                <div className='payment-method-selector__actions'>
                    <button 
                        className='payment-method-selector__cancel-btn'
                        onClick={handleCancel}
                        disabled={isProcessing}
                    >
                        Cancelar
                    </button>
                    <button 
                        className='payment-method-selector__confirm-btn'
                        onClick={handleConfirmPayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Procesando...' : 'Continuar con el pago'}
                    </button>
                </div>
            )}

            {selectedMethod && !isProcessing && (
                <div className='payment-method-selector__selected-info'>
                    <p>Método seleccionado: <strong>{paymentMethods.find(m => m.id === selectedMethod)?.name}</strong></p>
                </div>
            )}
        </div>
    );
};

export default PaymentMethodSelector;