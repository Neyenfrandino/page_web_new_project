from fastapi import APIRouter, HTTPException
from app.repository.mercado_pago.mercado_pago import get_mercado_pago
from app.schema import MercadoPagoPreferenceSchema

router = APIRouter(prefix='/mercado_pago', tags=['Mercado_Pago'])

@router.post('/create-preference')
async def create_preference(preference_schema: MercadoPagoPreferenceSchema):
    """
    Crea una preferencia de pago en Mercado Pago y devuelve el init_point.
    """
    try:
        response = get_mercado_pago(preference_schema)
        return {"success": True, "data": response}
    except HTTPException as e:
        # Devuelve errores controlados (400, 500, etc.)
        raise e
    except Exception as e:
        # Devuelve error genérico
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
