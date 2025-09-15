// 📝 Template base para crear una orden limpia y ordenada
export const orderTemplate = {
  nombre: "",                // Nombre completo del cliente
  correo: "",                // Email del cliente
  telefono: "",              // Teléfono de contacto
  direccion: "",             // Dirección completa
  ciudad: "",                // Ciudad
  codigo_postal: "",         // Código postal
  pais: "",                   // País de destino
  pedido_id: "",             // Generado por backend o frontend
  fecha_compra: "",          // Lo asigna el backend cuando se confirma
  metodo_pago: "",           // Ej: "mercadopago", "stripe", etc.
  estado_pago: "pendiente",  // pendiente | aprobado | fallido (lo maneja el backend)
  productos: [
    {
      id_producto: "",        // ID único del producto
      nombre: "",             // Nombre del producto
      cantidad: 0,            // Cantidad comprada
      precio_unitario: 0      // Precio por unidad
    }
  ],
  notas: "",                  // Notas opcionales del cliente
  origen_pedido: "web",       // web | app | tienda física
  tracking_id: ""             // Para asignar cuando se cree el envío
};
