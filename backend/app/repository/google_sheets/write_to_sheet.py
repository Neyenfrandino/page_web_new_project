import os
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Configuración del archivo de credenciales
SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'google_sheets_key.json')

# Scopes necesarios para Google Sheets
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

def authenticate_sheets_api():
    """
    Autenticación con Google Sheets usando credenciales de la cuenta de servicio.
    """
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        raise FileNotFoundError(f'No se encontró el archivo de credenciales: {SERVICE_ACCOUNT_FILE}')
    
    credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    # Si las credenciales han expirado, actualízalas
    if credentials.expired and credentials.refresh_token:
        credentials.refresh(Request())

    # Construcción del servicio de Google Sheets
    return build('sheets', 'v4', credentials=credentials)


def get_last_row(service, spreadsheet_id, column="A"):
    """
    Obtiene la última fila ocupada en una hoja de cálculo de Google Sheets.
    :param service: Servicio autenticado de Google Sheets.
    :param spreadsheet_id: ID de la hoja de cálculo.
    :param column: Columna donde buscar la última fila ocupada (por defecto, columna "A").
    :return: Número de la siguiente fila vacía.
    """
    try:
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=spreadsheet_id, range=f"{column}:{column}").execute()
        values = result.get('values', [])
        return len(values) + 1  # Retorna la siguiente fila vacía
    except HttpError as error:
        print(f"Error al obtener la última fila: {error}")
        return None


def write_to_sheet(service, spreadsheet_id, values):
    """
    Escribe datos en la primera fila vacía de una hoja de cálculo de Google Sheets.
    :param service: Servicio autenticado de Google Sheets.
    :param spreadsheet_id: ID de la hoja de cálculo.
    :param values: Lista de listas con los datos a escribir.
    :return: Respuesta de la API de Google Sheets.
    """
    try:
        # Obtener la última fila ocupada
        last_row = get_last_row(service, spreadsheet_id)
        if last_row is None:
            raise Exception("No se pudo determinar la última fila ocupada.")

        # Definir el rango dinámico en la primera columna
        range_ = f"A{last_row}:C{last_row + len(values) - 1}"
        
        sheet = service.spreadsheets()
        body = {'values': values}
        result = sheet.values().update(
            spreadsheetId=spreadsheet_id, 
            range=range_, 
            valueInputOption='RAW', 
            body=body
        ).execute()

        return result
    except HttpError as error:
        print(f"Error al escribir en la hoja de cálculo: {error}")
        return None


# ID de la hoja de cálculo
spreadsheet_id = '1LpNpg0azzRz6l0mGq9kL4WtxO8hh5OK2AhmTIeXB0Gw'

# Autenticación
authentication = authenticate_sheets_api()

# Datos a escribir
values_to_write = [
    ['Juan', '30', 'Madrid'],
    ['Ana', '25', 'Barcelona'],
    ['Carlos', '35', 'Valencia']
]

# Escribir en la hoja de cálculo
write_result = write_to_sheet(authentication, spreadsheet_id, values_to_write)

print(write_result)
