import './shoppingCart.scss'

import Header from '../../componets/header/header'
const ShoppingCart = () => {
    return(
        <div className='shopping-cart__container'>
            <div className='shopping-cart__content'>
                <Header>
                    <div className='shopping-cart__header-content'>
                        <h1>Carrito de Compras</h1>
                        <p>Compra y almacena tus productos favoritos para su cumplimiento.</p>
                    </div>
                </Header>

                <section className='shopping-cart__section'>
                    <h2>Productos</h2>
                    <div className='shopping-cart__product-list'>
                        <div className='shopping-cart__product'>
                            <img src='https://cdn.pixabay.com/photo/2022/09/30/17/54/savoy-cabbage-7489978_1280.jpg' alt='Producto' />
                            <div className='shopping-cart__product-info'>
                                <h3>Plantá de Cabeza</h3>
                                <p>Plantá de cabeza es un producto de la planta de cabeza que se utiliza para cultivar la planta de cabeza.</p>
                                <div className='shopping-cart__product-price'>
                                    <span>$49,99</span>
                                    <button className='shopping-cart__product-button'>Comprar</button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Repeat the product list for each product */}
                    </div>

                </section>
            </div>


        </div>
    )
}

export default ShoppingCart