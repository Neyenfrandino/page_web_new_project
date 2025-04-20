
import Header from '../../componets/header/header';

import './products.router.scss';
const Products = () => {
    return (
        <div className='products__container'>
            <Header> 
                <div className='products__header-content'>
                    <h1>Simplify Your Focus</h1>
                    <p>Clarity emerges when complexity fades. Embrace the essence of your potential.</p> 
                </div>
            </Header>
        

            <section className='products__content'>
                <div className='products__section'>
                    <h2>Mindful Design</h2>
                    <p>Less clutter, more meaning. Every element serves a purpose.</p>
                </div>
                <div className='products__section'>
                    <h2>Intentional Growth</h2>
                    <p>Small steps, significant progress. Continuous improvement.</p>
                </div>
            </section>  


        </div>
    );
};

export default Products;