
import { useContext, useState, useCallback } from 'react';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import Header from '../../componets/header/header';
import Button from '../../componets/button/button';
import Grid from '../../componets/grid/grid';

import './products.router.scss';
const Products = () => {
    const { products } = useContext(ContextJsonLoadContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [triggerElement, setTriggerElement] = useState(null);

    const handleOpenModal = useCallback((status, e, item) => {
        if (!item || !item.id) return;

        setTriggerElement(e.currentTarget);
        setIsModalOpen({ isOpen: status, item });
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTriggerElement(null);
    }, []);

    return (
        <div className='products__container'>
            <>
                <SEOHelmet 
                    title='Products' 
                    description='Simplify Your Focus' 
                    keywords='tecnología, software, negocios, soluciones digitales, emprendimientos' 
                    author='Neyen Frandino' 
                    url='https://miempresa.com' 
                    image='https://miempresa.com/default-image.jpg' 
                />
            </> 
            
            <Header>
                <div className='products--header__container'>
                    <div className='products--header__img'>
                    <img src="/img/initial_products.jpg" alt="" />
                    </div>
                    
                    <div className='products--header__content'>
                    <div className='products--header__content--title'>
                        <h1>
                        <span>NUESTROS</span>
                        <span>PRODUCTOS</span>
                        </h1>
                    </div>
                    
                    <div className='products--header__content--subtitle'>
                        <p>Alimentos y productos que nacen de la tierra, pensados para cuidar tu bienestar y el del planeta.</p>
                    </div>
                    </div>

                    {/* Opcional: indicador de scroll */}
                    <div className="scroll-indicator">
                    <div className="mouse"></div>
                    </div>
                </div>
            </Header>

            <div className='products--content'>
                <div className='products--content--grid'>
                    <Grid items={products} gridType="products" slice={5} setIsOpen={handleOpenModal} variant="minimal" />
                </div>
            </div>


        </div>
    );
};

export default Products;