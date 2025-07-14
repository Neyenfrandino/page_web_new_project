import { useContext } from 'react';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import { Link } from 'react-router-dom';
import './cta_servicios.scss';

const CTAServicios = () => {
    const { dataImpactoReal } = useContext(ContextJsonLoadContext);

    console.log(dataImpactoReal);
    if (!dataImpactoReal || dataImpactoReal.length === 0) {
        return <div className="cta-servicios__loading">Cargando...</div>;
    }
    return(
        <div className="cta-servicios__container">
            <div className="cta-section">
                <div className="cta-content">
                <h2 className="cta-title">Únete al Movimiento</h2>
                <p className="cta-text">
                    Cada acción cuenta. Cada persona importa. 
                    Juntos estamos escribiendo el futuro de nuestro planeta.
                </p>
                <div className="cta-stats">
                    <div className="stat">
                        <div className="stat-number">{ dataImpactoReal[0].value }</div>
                        <div className="stat-label">{ dataImpactoReal[0].title }</div>
                    </div>

                    <div className="stat">
                        <div className="stat-number">{ dataImpactoReal[7].value }</div>
                        <div className="stat-label">{ dataImpactoReal[7].title }</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-number">{ dataImpactoReal[1].value }</div>
                        <div className="stat-label">{ dataImpactoReal[1].title }</div>
                    </div>
                </div>
                <Link to={'/servicios'} className="cta-button">
                    Conviértete en Guardián
                    <span className="button-arrow">→</span>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default CTAServicios;