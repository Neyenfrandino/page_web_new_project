import React, { useState, useEffect } from 'react';
import './formulario_usuario.scss';

const FormularioUsuario = ({ onSubmit }) => {
  const initialFormState = {
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigo_postal: "",
    pais: "",
    notas: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [progress, setProgress] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  // Calcular progreso y validez del formulario
  useEffect(() => {
    const filledFields = Object.values(formData).filter(value => value.trim() !== "").length;
    const totalFields = Object.keys(formData).length;
    const progressPercentage = (filledFields / totalFields) * 100;

    setProgress(progressPercentage);
    setIsFormValid(filledFields === totalFields);
  }, [formData]);

  // Manejo de inputs
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Manejo de submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onSubmit) {
      onSubmit(formData);
    document.body.classList.remove('modal-open');


      // Cerrar modal y resetear formulario
      if (onClose) {
        onClose();
        document.body.classList.remove('modal-open');

      }
      setFormData(initialFormState);
    }
  };

  return (
    <div className="formulario-container">
      {/* Header */}
      <div className="form-header">
        <h2>Información Personal</h2>
      </div>

      {/* Barra de Progreso */}
      <div className="progress-container">
        <div className="progress-label">
          <span>Progreso</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Formulario */}
      <form className="form-content" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              placeholder="Ingresa tu nombre"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              value={formData.correo}
              onChange={(e) => handleInputChange('correo', e.target.value)}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                placeholder="+1 234 567 8900"
                autoComplete="tel"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigo_postal">Código Postal</label>
              <input
                type="text"
                id="codigo_postal"
                value={formData.codigo_postal}
                onChange={(e) => handleInputChange('codigo_postal', e.target.value)}
                placeholder="12345"
                autoComplete="postal-code"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              value={formData.direccion}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
              placeholder="Calle, número, colonia"
              autoComplete="street-address"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad</label>
              <input
                type="text"
                id="ciudad"
                value={formData.ciudad}
                onChange={(e) => handleInputChange('ciudad', e.target.value)}
                placeholder="Tu ciudad"
                autoComplete="address-level2"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pais">País</label>
              <input
                type="text"
                id="pais"
                value={formData.pais}
                onChange={(e) => handleInputChange('pais', e.target.value)}
                placeholder="Tu país"
                autoComplete="country"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas adicionales</label>
            <textarea
              id="notas"
              value={formData.notas}
              onChange={(e) => handleInputChange('notas', e.target.value)}
              placeholder="Información adicional..."
              rows="3"
            ></textarea>
          </div>

          {/* Botón de envío */}
          <div className="form-actions">
            <button
              type="submit"
              className={`submit-button ${isFormValid ? 'active' : ''}`}
              disabled={!isFormValid}
              aria-describedby="progress-status"
            >
              Continuar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioUsuario;
