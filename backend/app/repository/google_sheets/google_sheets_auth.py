import os
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build


# Establece la ruta al archivo de clave de la cuenta de servicio
SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'google_sheets_key.json')

# Scopes que se necesitan para interactuar con Google Sheets
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

def authenticate_sheets_api():
    """
    Autenticación con Google Sheets usando las credenciales de la cuenta de servicio
    """
    if not SERVICE_ACCOUNT_FILE:
        raise FileNotFoundError(f'El archivo de credenciales no se encuentra en la ruta: {SERVICE_ACCOUNT_FILE}')
    
    credentials = Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    # Si las credenciales han expirado, actualízalas
    if credentials.expired:
        credentials.refresh(Request())

    # Construir el servicio para Google Sheets
    service = build('sheets', 'v4', credentials=credentials)
    return service
