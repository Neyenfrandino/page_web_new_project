import React, { useState } from 'react';
import Header from '../../componets/header/header';
import { Plus, Minus, Trash2 } from 'lucide-react';
import './shoppingCart.scss';

const ShoppingCart = () => {
    // Sample products data
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Planta de Cabeza',
            description: 'Planta decorativa perfecta para espacios interiores con poca luz solar.',
            price: 49.99,
            image: 'https://cdn.pixabay.com/photo/2022/09/30/17/54/savoy-cabbage-7489978_1280.jpg',
            quantity: 1
        },
        {
            id: 2,
            name: 'Suculenta Echeveria',
            description: 'Suculenta de bajo mantenimiento ideal para decorar tu escritorio o sala.',
            price: 29.99,
            image: 'https://cdn.pixabay.com/photo/2019/05/29/19/04/succulent-4238111_1280.jpg',
            quantity: 2
        },
        {
            id: 3,
            name: 'Bonsái Ficus',
            description: 'Bonsái tradicional japonés perfecto para cualquier ambiente del hogar.',
            price: 89.99,
            image: 'https://cdn.pixabay.com/photo/2018/02/01/10/41/bonsai-3122315_1280.jpg',
            quantity: 1
        }
    ]);

    // Function to increase product quantity
    const increaseQuantity = (id) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        ));
    };

    // Function to decrease product quantity
    const decreaseQuantity = (id) => {
        setProducts(products.map(product => 
            product.id === id && product.quantity > 1 
                ? { ...product, quantity: product.quantity - 1 } 
                : product
        ));
    };

    // Function to remove product from cart
    const removeProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    // Calculate cart subtotal
    const subtotal = products.reduce((total, product) => total + (product.price * product.quantity), 0);
    
    // Calculate shipping (free over $100)
    const shipping = subtotal >= 100 ? 0 : 9.99;
    
    // Calculate total
    const total = subtotal + shipping;

    return(
        <div className='shopping-cart__container'>
            <div className='shopping-cart__content'>
                <Header>
                    <div className='shopping-cart__header-content'>
                        <h1>Carrito de Compras</h1>
                        <p>Compra y almacena tus productos favoritos para su envío.</p>
                    </div>
                </Header>
                
                <div className='shopping-cart__main'>
                    <section className='shopping-cart__products-section'>
                        <h2>Productos</h2>
                        
                        {products.length === 0 ? (
                            <div className='shopping-cart__empty'>
                                <p>Tu carrito está vacío</p>
                                <button className='shopping-cart__continue-button'>Continuar Comprando</button>
                            </div>
                        ) : (
                            <div className='shopping-cart__product-list'>
                                {products.map(product => (
                                    <div className='shopping-cart__product' key={product.id}>
                                        <div className='shopping-cart__product-image'>
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className='shopping-cart__product-info'>
                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>
                                            <div className='shopping-cart__product-actions'>
                                                <div className='shopping-cart__product-price'>
                                                    ${product.price.toFixed(2)}
                                                </div>
                                                <div className='shopping-cart__quantity-controls'>
                                                    <button 
                                                        className='shopping-cart__quantity-button'
                                                        onClick={() => decreaseQuantity(product.id)}
                                                        disabled={product.quantity <= 1}
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className='shopping-cart__quantity'>{product.quantity}</span>
                                                    <button 
                                                        className='shopping-cart__quantity-button'
                                                        onClick={() => increaseQuantity(product.id)}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button 
                                                    className='shopping-cart__remove-button'
                                                    onClick={() => removeProduct(product.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className='shopping-cart__summary-section'>
                        <div className='shopping-cart__summary'>
                            <h2>Resumen de Compra</h2>
                            <div className='shopping-cart__summary-details'>
                                <div className='shopping-cart__summary-row'>
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className='shopping-cart__summary-row'>
                                    <span>Envío</span>
                                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className='shopping-cart__summary-row shopping-cart__total'>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className='shopping-cart__promo-code'>
                                    <input type='text' placeholder='Código de promoción' />
                                    <button>Aplicar</button>
                                </div>
                                <button className='shopping-cart__checkout-button'>
                                    Proceder al Pago
                                </button>
                                <div className='shopping-cart__payment-methods'>
                                    <p>Aceptamos:</p>
                                    <div className='shopping-cart__payment-icons'>
                                        <span>Visa</span>
                                        <span>MC</span>
                                        <span>PayPal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;