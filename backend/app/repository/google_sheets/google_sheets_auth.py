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

# def read_sheet(service, spreadsheet_id, range_):
#     """
#     Lee datos de una hoja de cálculo de Google Sheets.
#     :param service: El servicio de Google Sheets autenticado.
#     :param spreadsheet_id: El ID de la hoja de cálculo.
#     :param range_: El rango de celdas que quieres leer.
#     :return: Los datos leídos de la hoja de cálculo.
#     """
#     sheet = service.spreadsheets()
#     result = sheet.values().get(spreadsheetId=spreadsheet_id, range=range_).execute()
#     values = result.get('values', [])
#     return values

# def write_to_sheet(service, spreadsheet_id, range_, values):
#     """
#     Escribe datos en una hoja de cálculo de Google Sheets.
#     :param service: El servicio de Google Sheets autenticado.
#     :param spreadsheet_id: El ID de la hoja de cálculo.
#     :param range_: El rango donde deseas escribir los datos.
#     :param values: Los datos a escribir en la hoja.
#     """
#     sheet = service.spreadsheets()
#     body = {
#         'values': values
#     }
#     result = sheet.values().update(spreadsheetId=spreadsheet_id, range=range_, valueInputOption='RAW', body=body).execute()
#     return result

# ID de la hoja de cálculo proporcionada
# spreadsheet_id = '1LpNpg0azzRz6l0mGq9kL4WtxO8hh5OK2AhmTIeXB0Gw'

# # Rango de celdas que quieres leer
# range_ = 'A1:C10'

# # Datos a escribir en la hoja de cálculo (esto puede cambiarse según lo que necesites)
# values_to_write = [
#     ['Nombre', 'Edad', 'Ciudad'],
#     ['Juan', '30', 'Madrid'],
#     ['Ana', '25', 'Barcelona'],
#     ['Carlos', '35', 'Valencia']
# ]

# # Escribir los datos en la hoja de cálculo
# # write_result = write_to_sheet(asd, spreadsheet_id, range_, values_to_write)

# # Autenticación y escritura de la hoja de cálculo
# asd = authenticate_sheets_api()

# Leer los datos de la hoja de cálculo
# read_result = read_sheet(asd, spreadsheet_id, range_)
# print(f"Datos leídos: {read_result}")



# Imprimir el resultado de la escritura
# print(f"Datos escritos correctamente: {write_result}")
