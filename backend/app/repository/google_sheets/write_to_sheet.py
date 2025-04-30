import os
import dotenv
from google_sheets_auth import authenticate_sheets_api
from googleapiclient.errors import HttpError

dotenv.load_dotenv()
# Configuración del archivo de credenciales
SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'google_sheets_key.json')

# Scopes necesarios para Google Sheets
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# ID de la hoja de cálculo
spreadsheet_id = os.environ.get('spreadsheet_id')

# Autenticación
authentication = authenticate_sheets_api()

def get_last_row_and_id(service, spreadsheet_id, column="A"):
    """
    Obtiene la última fila ocupada y el último ID registrado en una hoja de cálculo de Google Sheets.
    """
    try:
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=spreadsheet_id, range=f"{column}:{column}").execute()
        values = result.get('values', [])

        if not values:
            return 2, 0  # Asumiendo que la fila 1 es de encabezado

        last_row = len(values) + 1
        last_id = int(values[-1][0]) if values[-1][0].isdigit() else 0  # Extraer último ID
        return last_row, last_id
    except HttpError as error:
        print(f"Error al obtener la última fila e ID: {error}")
        return None, None

def recorrer_columna_email(service, spreadsheet_id, column="C", correo: str = None):
    """
    Recorrer todos los valores de la columna de "Email" en la hoja de cálculo de Google Sheets, 
    comenzando desde la fila 2.
    """
    try:
        # Obtener todos los valores de la columna de "Email" (columna C) desde la fila 2
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=spreadsheet_id, range=f"{column}2:{column}").execute()  # Cambio aquí
        values = result.get('values', [])

        # Verificar si la columna tiene datos
        if not values:
            print("La columna de 'Email' está vacía o no tiene valores en la fila 2 o más abajo.")
            return False  # No existe correo

        # Recorrer e imprimir todos los valores de la columna, empezando desde la fila 2
        for row in values:
            email = row[0]  # Extraer el valor de la columna de correo
            if email == correo:
                print(f"Correo: {correo} ya existe.")
                return True  # El correo ya existe, devolver True

        # Si no se encuentra el correo en la columna, devolver False
        print(f"Correo: {correo} no existe, fue agregado a la lista.")
        return False

    except HttpError as error:
        print(f"Error al recorrer la columna de Email: {error}")
        return None
        
def write_to_sheet(service, spreadsheet_id, values):
    """
    Escribe datos en la primera fila vacía de una hoja de cálculo de Google Sheets,
    asignando un ID autoincremental en la columna A.
    """
    try:
        # Obtener la última fila vacía y el último ID registrado
        last_row, last_id = get_last_row_and_id(service, spreadsheet_id)
        if last_row is None or last_id is None:
            raise Exception("No se pudo determinar la última fila ocupada o el último ID.")

        # Agregar ID autoincremental a los valores
        values_with_ids = [[str(last_id + i + 1)] + row for i, row in enumerate(values)]

        # Definir el rango dinámico en la primera columna
        range_ = f"A{last_row}:H{last_row + len(values) - 1}"

        sheet = service.spreadsheets()
        body = {'values': values_with_ids}
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



# Llamar a la función para recorrer la columna de "Email" y verificar si el correo ya existe
correo = "juaaan@gmail.com"
email_existe = recorrer_columna_email(authentication, spreadsheet_id, correo=correo)

# Si el correo no existe en la columna, agregarlo a la hoja de cálculo
if not email_existe:  # Si el correo no existe, lo agregamos
    # Datos a escribir (ejemplo con los valores que mencionaste)
    values_to_write = [['Juan', correo, '4529087', 'Madrid', 'PDC', '2025-10-01', '2025-10-01']]

    # Escribir en la hoja de cálculo
    write_result = write_to_sheet(authentication, spreadsheet_id, values_to_write)

    # Verificar si la escritura fue exitosa
    if write_result:
        print("Datos escritos exitosamente:", write_result)
    else:
        print("Error al escribir los datos.")
else:
    # Si el correo ya existe, se imprime un mensaje
    print("Correo ya existe")
