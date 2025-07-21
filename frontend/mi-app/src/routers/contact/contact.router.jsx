
import { useContext } from 'react';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import SEOHelmet from '../../componets/SEOHelmet/SEOHelmet';
import Header from '../../componets/header/header';
import Button from '../../componets/button/button';
import CtaHablemos from '../../componets/cta_hablemos/cta_hablemos';
import MessageFinal from '../../componets/message_final/message_final';
import './contact.router.scss';

const Contact = () => {

    const { message } = useContext(ContextJsonLoadContext);
    console.log(message);

    if (!message) return null;

    return (
        <div className='contact__container'>
            <>
                 <SEOHelmet 
                    title="Movimiento Naluum | Soluciones Regenerativas"
                    description="Descubrí cómo el Movimiento Naluum impulsa soluciones regenerativas para transformar vidas, conectar comunidades y sanar la Tierra."
                    keywords="regeneración, comunidad, agricultura regenerativa, soluciones sostenibles, plantines, tecnología social"
                    author="Neyen Frandino"
                    url="https://miempresa.com"
                    image="https://miempresa.com/img/logo_naluum_og.jpg"
                />
            </>
        
            <Header>
                <div className='contact--header__container'>
                    <div className='contact--header__img'>
                        <img src="/img/contactos_img_inicial.jpg" alt="" />
                    </div>
                    
                    <div className='contact--header__content'>
                        <div className='contact--header__content--title'>
                            <h1>
                                <span>CONECTEMOS CON</span>
                                <span>PROPÓSITO</span>
                            </h1>
                        </div>
                        
                        <div className='contact--header__content--subtitle'>
                            <p>Escribinos, sembrá una pregunta y cultivemos una respuesta juntos</p>
                        </div>
                        
                        <div className='contact--header__content--button'>
                            <Button text="ENVIAR UN MENSAJE" link="/contacto" style="primary" />
                        </div>
                    </div>

                    {/* Opcional: indicador de scroll */}
                    <div className="scroll-indicator">
                        <div className="mouse"></div>
                    </div>
                </div>
            </Header>

            <div className='contact--content'>

                <div className='contact--content__socials-media'>
                    <CtaHablemos />
                </div>

                <div className='contact--content__message'>
                    <MessageFinal indexMessage={4} />
                </div>

            </div>
        
        </div>
    );
};

export default Contact;