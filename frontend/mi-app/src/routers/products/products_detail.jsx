// routers/products/productDetail.jsx
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import ModalCard from '../../componets/card/modal_card/modal_card';
import PaymentMethodSelector from '../../componets/payment_method/payment_method_selector';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ContextJsonLoadContext);
  const product = products.find(p => String(p.id) === String(id));

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail">
      <h2>Detalle del producto</h2>
      <ModalCard course={product}>
        <PaymentMethodSelector
          item={product}
          onMethodSelect={(method) => console.log('Método seleccionado:', method)}
        />
      </ModalCard>
    </div>
  );
};

export default ProductDetail;
