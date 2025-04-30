from fastapi import APIRouter, HTTPException
# from app.repository.mercado_pago import mercado_pago
from app.repository.mercado_pago.mercado_pago import get_mercado_pago

from app.schema import MercadoPagoPreferenceSchema

router = APIRouter(prefix='/mercado_pago', tags=['Mercado_Pago'])

@router.post('/create-preference')
async def create_preference(preference_schema: MercadoPagoPreferenceSchema):
    print(preference_schema)
    return preference_schema
    # try:
    #     response = get_mercado_pago(preference_schema)
    #     return response
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))
