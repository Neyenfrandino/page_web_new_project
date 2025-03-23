from google_sheets_auth import authenticate_sheets_api

def read_sheet(service, spreadsheet_id, range_):
    """
    Lee datos de una hoja de cálculo de Google Sheets.
    :param service: El servicio de Google Sheets autenticado.
    :param spreadsheet_id: El ID de la hoja de cálculo.
    :param range_: El rango de celdas que quieres leer.
    :return: Los datos leídos de la hoja de cálculo.
    """
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=spreadsheet_id, range=range_).execute()
    values = result.get('values', [])
    return values

# # Autenticación y escritura de la hoja de cálculo
authentication = authenticate_sheets_api()
spreadsheet_id = '1LpNpg0azzRz6l0mGq9kL4WtxO8hh5OK2AhmTIeXB0Gw'
range_ = 'A1:C10'

# Leer los datos de la hoja de cálculo
read_result = read_sheet(authentication, spreadsheet_id, range_)
print(f"Datos leídos: {read_result}")