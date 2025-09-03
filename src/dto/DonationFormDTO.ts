export interface DonationFormDTO {
  Acepto_T_C__c?: boolean;
  Acepto_tratamiento_de_datos_personales__c?: boolean;
  LastName?: string;
  Apellido_del_receptor__c?: string;
  MobilePhone?: string;
  Ciudad_entrega__c?: string;
  Email?: string;
  Correo_electr_nico_del_receptor__c?: string;
  Descuento__c?: number;
  Direcci_n_de_entrega__c?: string;
  Dpto_Interior_entrega__c?: string;
  Es_regalo__c?: boolean;
  Especie_que_adopta__c?: string;
  Fecha_de_env_o_del_regalo__c?: string;
  Fecha_de_formulario__c?: string;
  Fecha_de_nacimiento__c?: string;
  Forma_de_pago__c?: string;
  Identidad_de_g_nero__c?: string;
  GiftAmount?: number;
  GiftReceivedDate?: string;
  Mensaje_del_regalo__c?: string;
  FirstName?: string;
  Nombre_apodo_del_remitente__c?: string;
  Nombre_del_cup_n_aplicado__c?: string;
  Nombre_del_receptor__c?: string;
  Nro_de_documento__c?: string;
  Distrito_de_entrega__c?: string;
  Provincia_entrega__c?: string;
  Referencia_de_entrega__c?: string;
  Recurrencia__c?: string;

  Tipo_de_aportaci_n__c: string;
  Tipo_de_documento__c: string;
  TransactionPeriod?: string;
  TransactionDay?: number | string;
  TransactionInterval: number;

  Subtotal__c?: number;
  PaymentMethod?: string;
  Id_externo_de_MP__c?: string;
  Marca_de_la_tarjeta__c?: string;
  Origen_de_la_entrada__c?: string;

  UTM_Campaign__c?: string;
  UTM_Content__c?: string;
  UTM_Media__c?: string;
  UTM_Source__c?: string;
  UTM_Term__c?: string;
}

// Validación básica del DTO
export function validateDonationForm(form: DonationFormDTO): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validación de campos requeridos (ajusta según tus necesidades)
  if (!form.FirstName) {
    errors.push("El campo Nombre es requerido");
  }

  if (!form.LastName) {
    errors.push("El campo Apellido es requerido");
  }

  if (!form.Email) {
    errors.push("El campo Correo electrónico es requerido");
  } else if (!isValidEmail(form.Email)) {
    errors.push("El formato del correo electrónico es inválido");
  }

  // Validación de correo electrónico del receptor si es un regalo
  if (
    form.Es_regalo__c &&
    form.Correo_electr_nico_del_receptor__c &&
    !isValidEmail(form.Correo_electr_nico_del_receptor__c)
  ) {
    errors.push("El formato del correo electrónico del receptor es inválido");
  }

  // Validación de fechas
  const dateFields = [
    {
      name: "Fecha_de_env_o_del_regalo__c",
      value: form.Fecha_de_env_o_del_regalo__c,
    },
    { name: "Fecha_de_formulario__c", value: form.Fecha_de_formulario__c },
    { name: "Fecha_de_nacimiento__c", value: form.Fecha_de_nacimiento__c },
  ];

  for (const field of dateFields) {
    if (field.value && !isValidDate(field.value)) {
      errors.push(
        `El formato de la fecha en ${field.name} es inválido (debe ser AAAA-MM-DD)`
      );
    }
  }

  // Validación de números
  if (form.Descuento__c !== undefined && !isValidNumber(form.Descuento__c)) {
    errors.push("El descuento debe ser un número válido");
  }

  if (form.GiftAmount !== undefined && !isValidNumber(form.GiftAmount)) {
    errors.push("El importe debe ser un número válido");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Funciones auxiliares de validación
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidDate(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function isValidNumber(num: number): boolean {
  return !isNaN(num) && num !== null && num !== undefined;
}
