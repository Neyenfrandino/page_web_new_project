from google_sheets_auth import authenticate_sheets_api

def write_to_sheet(service, spreadsheet_id, range_, values):
    """
    Escribe datos en una hoja de cálculo de Google Sheets.
    :param service: El servicio de Google Sheets autenticado.
    :param spreadsheet_id: El ID de la hoja de cálculo.
    :param range_: El rango donde deseas escribir los datos.
    :param values: Los datos a escribir en la hoja.
    """
    sheet = service.spreadsheets()
    body = {
        'values': values
    }
    result = sheet.values().update(spreadsheetId=spreadsheet_id, range=range_, valueInputOption='RAW', body=body).execute()
    return result



spreadsheet_id = '1LpNpg0azzRz6l0mGq9kL4WtxO8hh5OK2AhmTIeXB0Gw'
authentication = authenticate_sheets_api()


# Rango de celdas que quieres leer
range_ = 'A1:C10'

# Datos a escribir en la hoja de cálculo (esto puede cambiarse según lo que necesites)
values_to_write = [
    ['Nombre', 'Edad', 'Ciudad'],
    ['Juan', '30', 'Madrid'],
    ['Ana', '25', 'Barcelona'],
    ['Carlos', '35', 'Valencia']
]

# Escribir los datos en la hoja de cálculo
# write_result = write_to_sheet(asd, spreadsheet_id, range_, values_to_write)

