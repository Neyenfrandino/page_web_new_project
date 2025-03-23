from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.routers_mercado_pago.routers_mercado_pago import router as mercado_pago
import uvicorn

App = FastAPI()

# Configuración de CORS
App.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las solicitudes (puedes restringirlo con dominios específicos)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

# Incluir el router
App.include_router(mercado_pago)

if __name__ == "__main__":
    uvicorn.run("main:App", host="0.0.0.0", port=8000, reload=True)
