import './testimonios.scss';


const Testimonios = ({testimonios}) => {
    return (
        <div className="testimonios__container">
            <div className="testimonios__content">
                {
                    testimonios.slice(0, 2).map((testimonio, index) => {
                        const isLeft = index % 2 === 0;
                        const positionClass = isLeft ? 'testimonios__item--left' : 'testimonios__item--right';

                        return (
                            <div key={index} className={`testimonios__item ${positionClass}`}>
                                <div className="testimonios__avatar">
                                    <img src={testimonio.avatar} alt={testimonio.nombre} />
                                </div>
                                <div className="testimonios__card">
                                    <p>{testimonio.testimonio}</p>
                                    <div className="testimonios__author">
                                        <h4>{testimonio.nombre}</h4>
                                        <span>{testimonio.lugar}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Testimonios;
