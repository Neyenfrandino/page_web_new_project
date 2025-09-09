// Este es el template base de la orden
export const orderTemplate = {
  nombre: "",
  correo: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  codigo_postal: "",
  pais: "",
  pedido_id: "",          // Lo genera el backend o frontend
  fecha_compra: "",       // Lo asigna el backend cuando se confirma
  metodo_pago: "",
  estado_pago: "pendiente", // pendiente | aprobado | fallido. Esto lo vamos asignar directamente en el backend cuando se confirma
  productos: [],          // Aquí se agregan dinámicamente
  notas: "",
  origen_pedido: "web",   // Puede ser: web, app, tienda física
  tracking_id: ""         // Se asigna cuando el envío está listo
};
