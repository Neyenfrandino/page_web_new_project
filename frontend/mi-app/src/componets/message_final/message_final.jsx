import './message_final.scss';

const message = {
  title: '¡Gracias por sembrar con nosotros!',
  subtitle: 'El cambio verdadero florece desde adentro.',
  description: 'Cada paso que das en este camino es una semilla de vida para la Tierra. Somos parte de una misma red que sana, crea y renace.',
  description2: 'Naluum es movimiento, es memoria viva… y vos ya sos parte. Sigamos regenerando el mundo, juntos.',
  image: '/img/message_final.jpg'
}

const MessageFinal = ({ /* message */ }) => {
    return (
        <div className='message_final__container' style={{ backgroundImage: `url(${message.image})` }}>
            <div className='message_final__overlay'></div>
            <div className='message_final__content'>
                <div className='message_final__text'>
                    <h1 className='message_final__title'>{message.title}</h1>
                    <h2 className='message_final__subtitle'>{message.subtitle}</h2>
                    <div className='message_final__description'>
                        <p>{message.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default MessageFinal;