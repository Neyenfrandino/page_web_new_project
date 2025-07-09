import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button_back.scss';
import { ArrowLeft } from 'lucide-react';

const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button className="button-back" onClick={() => navigate(-1)}>
      <ArrowLeft size={18} className="icon" />
      Volver
    </button>
  );
};

export default ButtonBack;
