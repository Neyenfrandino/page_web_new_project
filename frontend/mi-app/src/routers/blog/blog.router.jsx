
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import Header from '../../componets/header/header';
import './blog.router.scss';

const Blog = () => {
    return (
        <div className='blog__container'>
            <>
                <SEOHelmet 
                    title='Blog' 
                    description='Simplify Your Focus' 
                    keywords='tecnología, software, negocios, soluciones digitales, emprendimientos' 
                    author='Neyen Frandino' 
                    url='https://miempresa.com' 
                    image='https://miempresa.com/default-image.jpg' 
                />
            </>
            
            <Header> 
                <div className='blog__header-content'>
                    <h1>Simplify Your Focus</h1>
                    <p>Clarity emerges when complexity fades. Embrace the essence of your potential.</p> 
                </div>
            </Header>
        

            <section className='blog__content'>
                <div className='blog__section'>
                    <h2>Mindful Design</h2>
                    <p>Less clutter, more meaning. Every element serves a purpose.</p>
                </div>
                <div className='blog__section'>
                    <h2>Intentional Growth</h2>
                    <p>Small steps, significant progress. Continuous improvement.</p>
                </div>
            </section> 
        </div>
    );
};

export default Blog;